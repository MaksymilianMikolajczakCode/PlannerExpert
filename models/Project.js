import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const subSchema = new Schema({
    taskTitle: {
      type: String,
      default: 'Task title',
      maxlength: 50,
      required: [true, 'Please provide a title'],
    },
    status: { 
        type: String,
        enum: ['Done', 'Working on', 'Stuck'],
        default: 'Working on'
    },
    date: {
        type: Date,
        default: Date.now() + 1000 * 60 * 60 * 24 * 5,
        required: [true, 'Please provide a date'],
    },
    person: {
        type: String,
        default: 'Me',
        maxlength: 50,
        required: [true, 'Please provide a person'],
    }
  });


const ProjectSchema = new Schema ({
    projectTitle: { 
        type: String,
        default: 'Project name',
        maxlength: 50,
        required: [true, 'Please provide a project title'],
    },
    description: {
        type: String,
        default: 'My project description!', 
        maxlength: 250,
        required: [true, 'Please provide a description'],
    },
    owner: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    task: [subSchema]
}, 
{timestamps: true});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;