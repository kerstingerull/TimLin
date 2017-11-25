<template>
    <div id="page">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Navbar</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
        <h1>InstagramWatcher - {{ date | moment("DD.MM.YYYY HH:mm:ss") }}</h1>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-sm-12">
                    more later {{ token }}<br/>
                    <i class="fa fa-camera-retro fa-5x"></i> fa-camera-retro
                </div>
                <div class="col-lg-6 col-sm-12">
                    <img src="../Assets/Images/amazon.jpg" />
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
