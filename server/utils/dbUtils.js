'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.setUpConnection = setUpConnection;
exports.listNotes = listNotes;
exports.createNote = createNote;
exports.updateNoteSortKey = updateNoteSortKey;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('../models/Note');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = _mongoose2.default.model('Note');

function setUpConnection() {
        _mongoose2.default.connect('mongodb://localhost/notes');
}

function listNotes() {
        return Note.find();
}

function createNote(data) {
        var note = new Note({
                title: data.title,
                text: data.text,
                color: data.color,
                createAt: new Date(),
                sortKey: data.sortKey
        });
        console.log("Create note: ", note);
        return note.save();
}
function updateNoteSortKey(data) {
        console.log("Update sortKey: ", data);
        return Note.findOneAndUpdate({ _id: data.id }, {
                sortKey: data.sortKey
        });
}
function updateNote(data) {
        return Note.findOneAndUpdate({ _id: data.id }, {
                title: data.title,
                text: data.text,
                color: data.color
        });
}
function deleteNote(id) {
        return Note.findById(id).remove();
}
