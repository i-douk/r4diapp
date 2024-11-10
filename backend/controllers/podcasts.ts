const podcastsRouter = require("express").Router();
import { Request, Response } from "express";
import tokenExtractor from "../utils/middleware";
import models from "../models";
import { PodcastDTO } from "../dtos/PodcastDTO";

// fetch all podcasts //
podcastsRouter.get("/", async (_req: Request, res: Response) => {
  const podcasts = await models.Podcast.findAll({
    include: [
      {
        model: models.Podcaster,
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "username",
            "disabled",
          ],
        },
      },
      {
        model: models.User,
        as: "followers",
        attributes: { exclude: ["username"] },
        through: {
          attributes: { exclude: ["podcastId", "userId"] },
        },
      },
    ],
  });

  const podcastsDTOs = podcasts.map((podcast) => new PodcastDTO(podcast));
  res.json(podcastsDTOs);
});

// fetch all porcasts added by a podcaster //
podcastsRouter.get("/:username", async (req: Request, res: Response) => {
  const podcaster = await models.Podcaster.findOne({
    where: { username: req.params.username },
  });
  if (podcaster) {
    const podcasts = await models.Podcast.findAll({
      where: { podcaster_id: podcaster?.toJSON().id },
    });
    res.json(podcasts);
  } else {
    res.status(404).json({ error: "podcaster not found" });
  }
});
// add podcast by current podcaster //
podcastsRouter.post(
  "/:username",
  tokenExtractor,
  async (req: Request, res: Response) => {
    //check if logged podcaster is the one adding the podcaster
    const podcaster = await models.Podcaster.findOne({
      where: { username: req.params.username },
    });
    const activePodcaster = await models.ActivePodcasterSession.findByPk(
      podcaster?.id,
    );
    console.log(podcaster);

    // if checked create the podcast
    if (podcaster && activePodcaster) {
      const newpod = await models.Podcast.create({
        ...req.body,
        podcaster_id: podcaster.id,
      });
      res.status(201).json(newpod);
    } else {
      res.status(404).json({ error: "Cant add podcast to this podcast" });
    }
  },
);

// add url to list of urls
podcastsRouter.patch(
  "/:id",
  tokenExtractor,
  async (req: Request, res: Response) => {
    const podcastId = req.params.id;
    const urlToAdd = req.body.url;
    const podcastToEdit = await models.Podcast.findByPk(podcastId);
    if (podcastToEdit) {
      podcastToEdit.urls = [...podcastToEdit.urls, urlToAdd];
      await podcastToEdit.save();
      res.json(podcastToEdit);
    } else {
      res.status(404).json({ error: "unable to patch urls of this podcast" });
    }
  },
);

// edit podcast
podcastsRouter.put(
  "/:id",
  tokenExtractor,
  async (req: Request, res: Response) => {
    const podcastId = req.params.id;
    const { name, description, transcribed, urls } = req.body;
    const podcastToEdit = await models.Podcast.findByPk(podcastId);
    if (podcastToEdit) {
      podcastToEdit.name = name;
      podcastToEdit.description = description;
      podcastToEdit.transcribed = transcribed;
      podcastToEdit.urls = urls;
      await podcastToEdit?.save();
      res.json(podcastToEdit);
    } else {
      res
        .status(404)
        .json({ error: "Unable to edit because this podcast doesn't exist" });
    }
  },
);

export default podcastsRouter;
