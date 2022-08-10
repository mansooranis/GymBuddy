const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Collection({
    members: {
        type:Array,
        },
    },
    {timestamps:true}
);

module.exports = mongoose.model("Converstation", ConversationSchema)