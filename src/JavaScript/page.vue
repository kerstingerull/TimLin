<template>
    <div id="page">
        <navigation-main v-bind:date="date"></navigation-main>
        <div class="container">

            <div class="row" v-for="(element, index) in timeline">
                <div class="col-lg-6 col-sm-12">

                    <div class="card float-sm-right mb-1" style="width:150px" v-if="index % 2 === 0">
                        <img class="card-img-top" :src="element.images.thumbnail.url" :alt="element.caption.text" :title="element.caption.text" />
                        <div class="card-body">
                            <p class="card-text"><i class="fa fa-comments"></i> {{ element.comments.count}} <i class="fa fa-heart text-danger"></i> {{ element.likes.count}}</p>
                        </div>
                    </div>

                </div>
                <div class="col-lg-6 col-sm-12">

                    <div class="card mb-1" style="width:150px" v-if="index % 2 === 1">
                        <img class="card-img-top" :src="element.images.thumbnail.url" :alt="element.caption.text" :title="element.caption.text" />
                        <div class="card-body">
                            <p class="card-text"><i class="fa fa-comments"></i> {{ element.comments.count}} <i class="fa fa-heart text-danger"></i> {{ element.likes.count}}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import InstagramApiClient from './InstagramApiClient.js';

    export default {
        data: function () {
            return {
                date: new Date(),
                token: '',
                timeline: null,
            }
        },
        methods: {
            load: function () {
                let ApiClient = new InstagramApiClient();
                this.token = ApiClient.getToken(this.$route);

                if (this.token === '') {
                    window.location.href = ApiClient.getTokenUrl();
                } else {
                    this.$router.push('/');
                    this.getTimeLine();
                }
            },
            getTimeLine: function () {
                let ApiClient = new InstagramApiClient();
                ApiClient.getTimeLine(this.token, this.callback);
            },
            callback:  function (response) {
                if (response.data != '') {
                    this.timeline = response.data.data;
                }
            }
        },
        created() {
            this.load();
        }
    }
</script>
