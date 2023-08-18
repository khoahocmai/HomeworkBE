<script>
    import { onMount } from "svelte"
    import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:3000'
    
    let tournaments = []
    let users = []
    let tournamentName = ''
    let selectedTournamentId = 1
    let selectedUserId = 1

    async function fetchTournaments() {
        const res = await axios.get('/tournaments')
        tournaments = res.data
    }

    async function fetchUsers() {
        const res = await axios.get('/users')
        users = res.data
    }

    async function addTournament() {
        await axios.post('/tournaments', { name: tournamentName })
        fetchTournaments()
    }

    async function addUserToTournament(e) {
        await axios.post(`/tournaments/${selectedTournamentId}/users/${selectedUserId}`)
        fetchTournaments()
    }

    async function deleteTournament(tournamentId) {
        await axios.delete(`/tournaments/${tournamentId}`)
        fetchTournaments()
    }

    async function deleteUserFromTournament(userId, tournamentId) {
        await axios.delete(`/tournaments/${tournamentId}/users/${userId}`)
        fetchTournaments()
    }

    async function finalizeTournament(tournamentId) {
        await axios.post(`/tournaments/${tournamentId}/finalize`)
        fetchTournaments()
    }
    
    onMount(() => {
        fetchTournaments()
        fetchUsers()
    })
</script>
<h1>Thêm giải đấu</h1>
<form>
    <span>Tên giải đấu: </span>
    <input bind:value={tournamentName} type="text">
    <input on:click={addTournament} type="submit" value="Thêm">
</form>

<h1>Danh sách giải đấu</h1>

<div>
    <button on:click={addUserToTournament}>Thêm</button>
    <span>người tham gia</span>
    <select bind:value={selectedUserId}>
        {#each users as user}
            <option value="{user.id}">{user.displayName}</option>
        {/each}
    </select>
    <span>vào giải đấu</span>
    <select bind:value={selectedTournamentId}>
        {#each tournaments as tournament}
            <option value="{tournament.id}">{tournament.name}</option>
        {/each}
    </select>
</div>

<div class="tournament-container">
    {#each tournaments as tournament}
        <div class="tournament card">
            <h2>{tournament.name}</h2>
            <p>Người tham gia:</p>
            {#each tournament.participants as participant}
                <div class="{'participant card ' + (tournament.winner?.id === participant.id ? 'success' : '')}">
                    <p><b>{participant.displayName}</b> ({participant.username})</p>
                    <p>Age: {participant.age}</p>
                    <button on:click={() => deleteUserFromTournament(participant.id, tournament.id)}>Xóa</button>
                </div>
            {:else}
                <p>No participant</p>
            {/each}
            <button on:click={() => deleteTournament(tournament.id)}>Xóa</button>
            <button on:click={() => finalizeTournament(tournament.id)}>Chọn người chiến thắng</button>
        </div>
    {/each}
</div>

<style>
    .tournament-container {
        display: flex;
    }
    .tournament {
        padding: 10px 20px;
        width: 300px;
        margin: 10px;
    }
    .participant {
        margin: 10px auto;
        padding: 10px 20px;
    }
    .card {
        border: 1px solid #ddd;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    .success {
        background-color: aquamarine;
    }
</style>