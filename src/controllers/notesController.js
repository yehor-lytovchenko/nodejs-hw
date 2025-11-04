import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export async function getAllNotes(req, res) {
  const { tag, search, page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find({ userId: req.user._id });

  if (search) {
    notesQuery.where({
      $text: { $search: search },
    });
  }
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  const [notes, totalNotes] = await Promise.all([
    notesQuery.clone().skip(skip).limit(perPage),
    notesQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
}

export async function getNoteById(req, res, next) {
  const { noteId } = req.params;
  const note = await Note.findById({ _id: noteId, userId: req.user._id });
  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }
  res.status(200).json(note);
}

export async function createNote(req, res) {
  const note = await Note.create({ ...req.body, userId: req.user._id });
  res.status(201).json(note);
}

export async function deleteNote(req, res, next) {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
}

export async function updateNote(req, res, next) {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    {
      new: true,
    },
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
}
