import { Template } from 'meteor/templating';
import { Players } from '../../api/player';

import './player.js'
import './players.html'

Template.adminPlayers.helpers({
    players() {
        return Players.find({}, { sort: { createdAt: -1 } });
    }
});
Template.adminPlayers.events({
    'submit .new-player'(event) {
        event.preventDefault();

        const target = event.target;

        Players.insert({
            first_name: target.first_name.value,
            last_name: target.last_name.value,
            type: target.type.value,
            createdAt: new Date(),
        });
        target.first_name.value = '';
        target.last_name.value = '';
    }
});