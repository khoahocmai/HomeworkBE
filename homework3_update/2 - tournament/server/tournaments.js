let tournaments = [
    { id: 1, name: 'Giải đấu 1', userIds: new Set([1, 2]), winnerId: null }
]

export function getTournaments() {
    return tournaments
}

export function findTournamentById(tournamentId) {
    return tournaments.find(tournament => tournament.id === tournamentId)
}

export function tournamentIsClose(tournamentId) {
    const tournament = findTournamentById(tournamentId)
    
    return tournament.winnerId != null
}

export function addTournament(tournament) {
    tournaments.push({
        id: tournaments.length+1,
        name: tournament.name,
        userIds: new Set(),
        winner: null,
    })
}

export function deleteTournamentById(tournamentId) {
    const beforeLength = tournaments.length
    tournaments = tournaments.filter(tournament => tournament.id !== tournamentId)

    if (tournaments.length === beforeLength) {
        return false
    }
    return true
}

export function addUserToTournament(userId, tournamentId) {
    const tournamentIndex = tournaments.findIndex(tournament => tournament.id === tournamentId)

    tournaments[tournamentIndex].userIds.add(userId)
}

export function deleteUserFromTournament(userId, tournamentId) {
    const tournamentIndex = tournaments.findIndex(tournament => tournament.id === tournamentId)

    tournaments[tournamentIndex].userIds.delete(userId)
}

export function finalizeTournament(tournamentId) {
    const tournamentIndex = tournaments.findIndex(tournament => tournament.id === tournamentId)
    const userIds = tournaments[tournamentIndex].userIds
    const winnerId = Array.from(userIds.values())[Math.floor(Math.random()*userIds.size)]

    tournaments[tournamentIndex].winnerId = winnerId
    return winnerId
}
