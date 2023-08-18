
import express from 'express'

import { findUserById} from '../users.js'
import { getTournaments, addTournament, deleteTournamentById, 
    addUserToTournament, deleteUserFromTournament, tournamentIsClose, finalizeTournament } from '../tournaments.js'


const tournamentRouter = express.Router()

tournamentRouter.get('/', (req, res) => {
    const tournaments = getTournaments().map(tournament => {
        return {
            id: tournament.id,
            name: tournament.name,
            winner: findUserById(tournament.winnerId),
            participants: Array.from(tournament.userIds).map(id => findUserById(id))
        }
    })
    res.send(tournaments)
})

tournamentRouter.post('/', (req, res) => {
    const tournament = req.body

    if (tournament?.name) {
        addTournament(tournament)
        res.send('Tournament added')
    } else {
        res.send('Missing field')
    }
})

tournamentRouter.delete('/:id', (req, res) => {
    const tournamentId = parseInt(req.params.id)
    const isDelete = deleteTournamentById(tournamentId)

    if (isDelete) res.send('Tournament deleted')
    else res.send('Cannot delete non-exist tournament')
})

tournamentRouter.post('/:tournamentId/users/:userId', (req, res) => {
    const tournamentId = parseInt(req.params.tournamentId)
    const userId = parseInt(req.params.userId)

    if (!tournamentIsClose(tournamentId)) {
        addUserToTournament(userId, tournamentId)
        res.send('User added')
    } else {
        res.send('Tournament is closed')
    }
})

tournamentRouter.delete('/:tournamentId/users/:userId', (req, res) => {
    const tournamentId = parseInt(req.params.tournamentId)
    const userId = parseInt(req.params.userId)

    if (!tournamentIsClose(tournamentId)) {
        deleteUserFromTournament(userId, tournamentId)
        res.send('User deleted')
    } else {
        res.send('Tournament is closed')
    }
})

tournamentRouter.post('/:tournamentId/finalize', (req, res) => {
    const tournamentId = parseInt(req.params.tournamentId)

    if (!tournamentIsClose(tournamentId)) {
        const winnerId = finalizeTournament(tournamentId)
        res.send({ winner: findUserById(winnerId) })
    } else {
        res.send('Tournament is close')
    }
})

export default tournamentRouter