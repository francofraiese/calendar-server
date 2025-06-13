import { Request, Response } from "express";
import { Event, User } from "@database/entities";
import { database } from "@database/db";
import {
  CreateEventServiceDto,
  GetEventsByMonthDto,
  UpdateEventServiceDto,
} from "@dtos/event";
import { toUTC } from "@utils/timezone";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { Between } from "typeorm";

const userRepo = database.getRepository(User);
const eventRepo = database.getRepository(Event);

export const create = async (payload: CreateEventServiceDto) => {
  const { description, eventDate, endDate, name, userId } = payload;

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) throw new Error("User not found.");

  const event = eventRepo.create({
    user,
    name,
    description,
    event_date: toUTC(new Date(eventDate), user.user_timezone),
    end_date: toUTC(new Date(endDate), user.user_timezone),
    is_deleted: false,
  });

  return await eventRepo.save(event);
};

export const update = async (payload: UpdateEventServiceDto) => {
  const { id, description, endDate, eventDate, name } = payload;

  const event = await eventRepo.findOne({
    where: { id, is_deleted: false },
    relations: ["user"],
  });

  if (!event) throw new Error("Event not found.");

  Object.assign(event, {
    name: name ?? event.name,
    description: description ?? event.description,
    event_date: eventDate
      ? toUTC(new Date(eventDate), event.user.user_timezone)
      : event.event_date,
    end_date: endDate
      ? toUTC(new Date(endDate), event.user.user_timezone)
      : event.end_date,
  });

  return await eventRepo.save({ ...event });
};

export const softDelete = async (id: string, userId: string) => {
  const event = await eventRepo.findOne({
    where: { id, user: { id: userId } },
    relations: ["user"],
  });

  if (!event) throw new Error("Event not found.");

  return await eventRepo.save({ ...event, is_deleted: true });
};

export const getMonth = async (payload: GetEventsByMonthDto) => {
  const { userId, month, year } = payload;

  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);

  return await eventRepo.find({
    where: {
      user: { id: userId },
      is_deleted: false,
      event_date: Between(start, end),
    },
    order: { event_date: "ASC" },
    relations: ["user"],
  });
};

export const getWeek = async (userId: string) => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });

  return await eventRepo.find({
    where: {
      user: { id: userId },
      is_deleted: false,
      event_date: Between(start, end),
    },
    order: { event_date: "ASC" },
    relations: ["user"],
  });
};

export const getById = async (id: string, userId: string) => {
  const event = await eventRepo.findOne({
    where: { id, user: { id: userId }, is_deleted: false },
    relations: ["user"],
  });

  if (!event) throw new Error("Event not found.");

  return event;
};
