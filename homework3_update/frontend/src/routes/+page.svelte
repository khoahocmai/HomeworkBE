<!-- Javascript -->
<script>
    import axios from 'axios'
    import { onMount } from 'svelte'
    let books = []

    function getBooks() {
        axios.get('http://localhost:3000/books').then(res => {
            console.log(res.data)
        })
    }

    onMount(() => {
        getBooks()
    })
</script>

<!-- HTML -->
<h1>Welcome to my website</h1>

<!-- CSS -->
<style>

</style>