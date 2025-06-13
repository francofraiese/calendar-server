import { Request, Response } from "express";
import * as eventService from "@services/event.service";
import { CreateEventServiceDto, UpdateEventServiceDto } from "@dtos/event";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    if (!userId) {
      res.status(401).json({ message: "No user id provided" });
      return;
    }

    const body: CreateEventServiceDto = { ...req.body, userId };

    const newEvent = await eventService.create(body);

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: UpdateEventServiceDto = { id: req.params.id, ...req.body };

    const updatedEvent = await eventService.update(body);

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const softDelete = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(401).json({ message: "No user id provided" });
      return;
    }

    const event = await eventService.softDelete(id, req.user!);

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getMonth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    if (!userId) {
      res.status(401).json({ message: "No user id provided" });
      return;
    }

    const now = new Date();
    const month = req.query.month
      ? Number(req.query.month) - 1
      : now.getMonth();
    const year = req.query.year ? Number(req.query.year) : now.getFullYear();

    const events = await eventService.getMonth({ userId, month, year });

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getWeek = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    if (!userId) {
      res.status(401).json({ message: "No user id provided" });
      return;
    }
    const events = await eventService.getWeek(userId);

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userId = req.user;

    if (!userId) {
      res.status(401).json({ message: "No user id provided" });
      return;
    }

    const event = await eventService.getById(id, userId);

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
