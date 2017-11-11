import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('players', function playersPublication() {
        return Players.find({}, { sort: { createdAt: 1 } });
    });
}

Meteor.methods({
    'players.insert' (firstName, lastName, type) {
        check(firstName, String);
        check(lastName, String);

        Players.insert({
            firstName: firstName,
            lastName: lastName,
            type: type,
            createdAt: new Date(),
        });
    },
    'players.remove' (playerId) {
        check(playerId, String);

        const player = Players.findOne(playerId);
        Players.remove(playerId);
    },
});