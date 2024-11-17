const podcastersRouter = require("express").Router();
import { sequelize } from "../../utils/db";
import { Request, Response } from "express";
import { JWTRequest } from "../../dtos/types";
import { PodcasterDTO } from "../../dtos/PodcasterDTO";
import models from "../../models";
import tokenExtractor from "../../utils/middleware";
import ActivePodcasterSession from "../../models/active_podcaster_session";

//GET ALL USERS THROUGH DEFAULT SCOPE FOR PUBLIC DATA
podcastersRouter.get("/", async (_req: Request, res: Response) => {
  const podcasters = await models.Podcaster.scope("defaultScope").findAll({
    include: [
      {
        model: models.Podcast,
        as: "podcasts",
        attributes: { exclude: [""] },
      },
      {
        model: models.User,
        as: "subscribers",
        attributes: {
          exclude: [
            "verified",
            "disabled",
            "updatedAt",
            "createdAt",
            "username",
          ],
        },
        through: {
          attributes: { exclude: ["podcasterId", "userId"] },
        },
      },
    ],
  });
  const podcastersWithubscriptionCount = await Promise.all(
    podcasters.map(async (podcaster) => {
      const subscriberscount = await models.Subscription.count({
        where: { podcaster_id: podcaster.id },
      });
      return {
        ...podcaster.toJSON(),
        subscriberscount,
      };
    })
  );

  res.json(podcastersWithubscriptionCount.map((podcaster) => new PodcasterDTO(podcaster)));
});

// GET SINGLE PODCASTER BY ID WITH PUBLIC DATA THROUGH DEFAULTSCOPE
podcastersRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const podcaster = await models.Podcaster.scope("defaultScope").findByPk(id, {
    include: [
      {
        model: models.Podcast,
        as: "podcasts",
        attributes: { exclude: [""] },
      },
      {
        model: models.User,
        as: "subscribers",
        attributes: {
          exclude: [
            "verified",
            "disabled",
            "updatedAt",
            "createdAt",
            "username",
          ],
        },
        through: {
          attributes: { exclude: ["podcasterId", "userId"] },
        },
      },
    ],
  });
  if (podcaster) {
    const podcasterDTO = new PodcasterDTO(podcaster);
    res.json(podcasterDTO);
  } else {
    res.status(422).json({ message: "podcaster does not exist" });
  }
});

// CREATE NEW PODCASTER
podcastersRouter.post("/", async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  const checkExistingPodcaster = await models.Podcaster.findOne({
    where: { username },
  });
  if (checkExistingPodcaster) {
    res.json({ message: " Podcaster with this email already exists" });
  }
  const podcaster = await models.Podcaster.create({
    username: username,
    name: name,
    password: password,
  });
  if (podcaster) {
    res.json(podcaster);
  } else {
    res
      .status(422)
      .json({ message: "creating podcaster failed, check data sent" });
  }
});

// EDIT PODDACSTER NAME AND AVATAR_URL AND BIO BY  PODCASTER
podcastersRouter.put(
  "/:id",
  tokenExtractor,
  async (req: JWTRequest, res: Response) => {
    const { id } = req.params;
    const { avatar_url, name, links, about } = req.body;
    if (req.decodedToken.id === Number(id)) {
      const [updateCount, updatedPodcasters] = await models.Podcaster.update(
        {
          avatar_url,
          name,
          links,
          about,
        },
        { where: { id }, returning: true },
      );

      // If the update count is greater than 0, return the updated podcaster
      if (updateCount > 0) {
        res.json(updatedPodcasters[0]);
      } else {
        res.status(422).json({ error: "Failed to update podcaster" });
      }
    } else {
      res
        .status(422)
        .json({ message: "podcaster must be authenticated to perform action" });
    }
  },
);

// VERIFY AND DISABLE PODCASTER BY SUPERUSER
podcastersRouter.patch(
  "/:id",
  tokenExtractor,
  async (req: JWTRequest, res: Response) => {
    const { role } = req.decodedToken;
    if (role == "superuser" || role == "admin") {
      const { id } = req.params;
      const { verified, disabled } = req.body;
      const podcasterToUpdate = await models.Podcaster.findByPk(id);
      if (podcasterToUpdate) {
        // Fetch the updated podcaster data
        const [updatedPodcaster] = await models.Podcaster.update(
          {
            verified: verified ?? podcasterToUpdate.verified,
            disabled: disabled ?? podcasterToUpdate.disabled,
          },
          { where: { id }, returning: true },
        );
        res.json(updatedPodcaster);
      } else {
        res.status(422).json({ error: "Podcaster not found" });
      }
    } else {
      res
        .status(422)
        .json({ message: "not enough permissions to perform this action" });
    }
  },
);

// ADD PODCAST TO PODCASTER BY PODCASTER
podcastersRouter.post(
  "/:id/podcasts",
  tokenExtractor,
  async (req: JWTRequest, res: Response) => {
    const { id } = req.params;
    const podcaster = await models.Podcaster.findByPk(id);
    if (podcaster) {
      const newPodcast = await models.Podcast.create({
        ...req.body,
        podcaster_id: id,
      });
      res.status(201).json(newPodcast);
    } else {
      res.status(422).json({ error: "Podcaster not found" });
    }
  },
);

// DELETE PDOCASTER BY SUPERUSER AND ACTIVE PODCSATER SESSION
podcastersRouter.delete(
  "/:id",
  tokenExtractor,
  async (req: JWTRequest, res: Response) => {
    if (req.decodedToken.role === "superuser") {
      const podcaster = await models.Podcaster.findOne({
        where: { id: req.params.id },
      });
      if (podcaster) {
        await sequelize.transaction(async (transaction) => {
          await ActivePodcasterSession.destroy({
            where: { podcasterId: podcaster.id },
            transaction,
          });
          await models.Podcaster.destroy({
            where: { id: podcaster.id },
            transaction,
          });
        });
        res.status(204).json("podcaster deleted from the database");
      } else {
        res
          .status(422)
          .json({
            error: "Podcaster nor found or failed to be deleted from database",
          });
      }
    } else {
      res
        .status(422)
        .json({ message: "not enough permissions to perform this action" });
    }
  },
);

export default podcastersRouter;
