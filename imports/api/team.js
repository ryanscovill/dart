import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Players } from "./player";

export const Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('teams', function playersPublication() {
        return Teams.find({}, { sort: { createdAt: 1 } });
    });
}

Meteor.methods({
    'teams.create'() {
        const players = Players.find({type: 'player'});
        const playerNames = players.map(player => player.firstName + " " + player.lastName);
        let arr1 = playerNames.slice();
        arr1.sort(() => 0.5 - Math.random());
        let arr2 = arr1.splice(0, Math.floor(arr1.length / 2));
        let matched = _.map(_.zip(arr1, arr2), (arr) => arr[0] + " & " + arr[1]);
        _.each(matched, (value) => {
           Teams.insert({
               name: value,
               createdAt: new Date()
           })
        });
    },
    'teams.remove' (teamId) {
        check(teamId, String);

        Teams.remove(teamId);
    },
});