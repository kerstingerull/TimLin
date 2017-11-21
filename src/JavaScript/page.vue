<template>
    <div id="page">
        <h1>InstagramWatcher - {{ date | moment("DD.MM.YYYY HH:mm:ss") }}</h1>
        more later {{ token }}
        <img src="../Assets/Images/amazon.jpg" />
    </div>
</template>
<script>
    import InstagramApiClient from './InstagramApiClient.js';

    export default {
        data: function () {
            return {
                date: new Date(),
                token: ''
            }
        },
        methods: {
            load: function () {

                let replaceString = '#access_token=';
                let hash = this.$route.hash;
                if (hash !== '') {
                    let index = hash.search(replaceString);
                    if (index === 0) {
                        this.token = hash.replace(replaceString, '');
                    }
                }
                console.log(this.token);
                let ApiClient = new InstagramApiClient();
                if (this.token === '') {
                    window.location.href = ApiClient.getTokenUrl();
                } else {
                    this.$router.push('/');
                }

            }
        },
        created() {
//            this.load();
        }
    }
</script>
<style lang="scss" scoped>
    @import '../Assets/Css/style';
</style>
