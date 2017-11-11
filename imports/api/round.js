import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Rounds = new Mongo.Collection('rounds');
export const Counters = new Mongo.Collection('counters');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('rounds', function playersPublication() {
        return Rounds.find({}, { sort: { createdAt: 1 } });
    });
}

Meteor.methods({
    'rounds.insert'(time) {
        check(parseInt(time), Number);

        Rounds.insert({
            roundNumber: incrementCounter(Counters, 'roundNumber'),
            time: time,
            status: 'created',
            timeRemaining: time * 60 * 1000,
            createdAt: new Date(),
        });
    },
    'rounds.startRound'(roundId) {
        const updateInterval = 1000;
        Meteor.setInterval(() => Meteor.call('rounds.decreaseTime', roundId), updateInterval);
        Rounds.update(roundId, {
            $set : {
                status: 'running',
                timeStarted: new Date(),
            }
        });

    },
    'rounds.endRound'(roundId) {
        Rounds.update(roundId, {
            $set : {
                status: 'finished',
                timeRemaining: 0,
            }
        })
    },
    'rounds.remove' (roundId) {
        check(roundId, String);
        Rounds.remove(roundId);
    },
    'rounds.decreaseTime'(roundId) {
        const round = Rounds.findOne(roundId);
        if (round) {
            const newTime = (round.time * 60 * 1000) - (new Date().getTime() - round.timeStarted.getTime()) + 1000;
            if (newTime > 1000 && round.status !== 'finished') {
                Rounds.update(roundId, {
                    $set: {
                        status: 'running',
                        timeRemaining: newTime
                    }
                });
            } else {
                Rounds.update(roundId, {
                    $set: {
                        timeRemaining: 0
                    }
                });
                Meteor.call('rounds.endRound', roundId);
            }
        }
    }
});
