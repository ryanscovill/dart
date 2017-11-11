import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Teams } from '../../api/team';
import { Rounds } from '../../api/round';
import './main.html';

if (Meteor.isClient) {
    Session.setDefault("stage", "start");
}

Template.mainPlay.onCreated(() => {
    Meteor.subscribe('teams');
    Meteor.subscribe('rounds');
});

Template.mainPlay.helpers({
    teams() {
        return Teams.find({}, { sort: { createdAt: 1 } });
    },
    isStartStage() {
        return Session.get("stage") === 'start';
    },
    isRoundWaiting() {
        return Rounds.find({status: 'running'}).count() === 0 && Session.get("stage") === 'roundWaiting';
    },
    isRoundRunning() {
        return Rounds.find({status: 'running'}).count() === 1 && Session.get("stage") === 'roundWaiting';
    },
    hasLastRound() {
        return Rounds.find({status: 'finished'}, { sort: { createdAt: -1 } }).count() > 0
    },
    finishedRound() {
        return Rounds.findOne({status: 'finished'}, { sort: { createdAt: -1 } });
    },
    currentRound() {
        return Rounds.findOne({status: 'running'})
    },
});
Template.mainPlay.events({
    'click .select-team'() {
        Session.set("stage", "roundWaiting");
    },
    'click .next-round'() {
        Session.set("stage", "roundWaiting");
    }
});