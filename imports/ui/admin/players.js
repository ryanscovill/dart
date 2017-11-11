import { Template } from 'meteor/templating';
import { Players } from '../../api/player';

import './player.js'
import './players.html'

Template.adminPlayers.onCreated(() => Meteor.subscribe('players'));

Template.adminPlayers.helpers({
    players() {
        return Players.find({}, { sort: { createdAt: 1 } });
    },
    playerCount() {
        return Players.find({type: 'player'}).count()
    }
});
Template.adminPlayers.events({
    'submit .new-player'(event) {
        event.preventDefault();

        const target = event.target;
        Meteor.call('players.insert', target.firstName.value, target.lastName.value,  target.type.value);

        target.firstName.value = '';
        target.lastName.value = '';
        window.scrollTo(0,document.body.scrollHeight);
    },
    'click .create-teams'() {
        Meteor.call('teams.create');
    }
});