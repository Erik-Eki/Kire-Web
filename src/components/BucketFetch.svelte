<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/subabaseClient";

    let bucketData = null
    let bucketContent = null

    async function listBuckets() {
        const { data, error } = await supabase
            .storage
            .listBuckets()

        if (error) {
            console.error(error)
            return
        }
        if (!data) {
            console.error("No data returned")
            return
        }

        console.log("BUCKET DATA:", data)

        bucketData = data
    }

    async function listBucketContent() {
        const { data, error } = await supabase
            .storage
            .from('images')
            .list('random', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            })

        if (error) {
            console.error(error)
            return
        }
        if (!data) {
            console.error("No data returned")
            return
        }

        console.log("BUCKET CONTENT:", data)

        bucketContent = data
    }

    onMount(() => {
        listBuckets()
        listBucketContent()
    })
        
</script>

<div>
    <p>Bucket data: {JSON.stringify(bucketData)}</p>
    <p>Bucket Content: {JSON.stringify(bucketContent)}</p>
</div>