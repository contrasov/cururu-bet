<template>
    <div class="flex flex-row gap-1 justify-center text-textoBranco py-6 ">
        <a href="#" @click="openLink(0)" >Álvaro Santos - 2024</a>
    </div>
</template>


<script>
export default {
    data(){
        return{
            Links: ["https://www.linkedin.com/in/alvarosantosuidev/"]
        }
    },
    methods: {
        openLink(index) {
            const url = this.Links[index];
            window.open(url, "_blank");
        }
    }
}
</script>
