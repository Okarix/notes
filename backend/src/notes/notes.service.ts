import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schema/note.schema';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const createdNote = new this.noteModel({
      ...createNoteDto,
      user: userId,
    });
    return createdNote.save();
  }

  async findAll(userId: string): Promise<Note[]> {
    return this.noteModel.find({ user: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const note = await this.noteModel.findOne({ _id: id, user: userId }).exec();
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    const updatedNote = await this.noteModel
      .findOneAndUpdate({ _id: id, user: userId }, updateNoteDto, { new: true })
      .exec();
    if (!updatedNote) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return updatedNote;
  }

  async remove(id: string, userId: string): Promise<Note> {
    const deletedNote = await this.noteModel
      .findOneAndDelete({ _id: id, user: userId })
      .exec();
    if (!deletedNote) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return deletedNote;
  }
}
