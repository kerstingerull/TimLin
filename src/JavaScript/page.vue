<template>
    <div id="page">
        <navigation-main v-bind:date="date"></navigation-main>
        <div class="container">
            <ul class="timeline">
                <li v-for="(element, index) in timeline" :class="{ 'timeline-inverted': element.type != 'image' && element.type != 'carousel' }">
                    <div  v-if="element.type == 'image' || element.type == 'carousel'">
                        <div class="timeline-badge"><i class="fa fa-instagram"></i></div>
                        <div class="timeline-panel p-2">
                            <div class="card float-left mr-2">
                                <img class="card-img-top" :src="element.images.thumbnail.url" :alt="element.caption.text" :title="element.caption.text" />
                                <div class="card-body">
                                    <p class="card-text"><i class="fa fa-comment-o"></i> {{ element.comments.count}} <i class="fa fa-heart-o text-danger"></i> {{ element.likes.count}}</p>
                                </div>
                            </div>
                            <div class="">
                                {{element.created_time}}<br/>
                                {{ element.caption.text }}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="timeline-badge"><i class="fa fa-comment-o"></i></div>
                        <div class="timeline-panel p-2">
                            <div>
                                {{element.created_time}}
                                {{element.text}}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
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
                    this.getPosts();

                }
            },
            getPosts: function () {
                let ApiClient = new InstagramApiClient();
                ApiClient.getPosts(this.token, this.callbackPosts);
            },
            callbackPosts: function (response) {
                if (response.data != '') {
                    this.timeline = response.data.data;
                }
                this.getComments();

            },
            getComments: function () {
                let ApiClient = new InstagramApiClient();
                let _this = this;

                this.timeline.forEach(function(element) {
                    let comments = ApiClient.getComments(element.id, _this.token, _this.callbackComments);
                })
            },
            callbackComments: function (response) {
                if (response.data.data.length > 0) {
                    this.timeline = this.timeline.concat(response.data.data);
                    this.timeline.sort(function (a, b) {
                        if (a.created_time < b.created_time) {
                            return 1;
                        }
                        if (a.created_time > b.created_time) {
                            return -1;
                        }
                        return 0
                    });
                }
            }
        },
        created() {
            this.load();
        }
    }
</script>
