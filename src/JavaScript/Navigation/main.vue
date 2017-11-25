<template>
        <div class="row">
            <div class="col-lg-4 col-sm-12">
                <ul class="nav">
                    <li class="nav-item">
                        <i class="fa fa-instagram fa-3x align-middle pl-1 pr-1"></i><span class="align-middle">TimLin</span>
                        <!--<img src="../../Assets/Images/amazon.jpg" alt="TimLin" style="width: 40px;"/>-->
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Not Yet</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-4 col-sm-12 text-center">
                {{ date | moment("DD.MM.YYYY HH:mm:ss") }}
            </div>
            <div class="col-lg-4 col-sm-12">
                <ul class="nav justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Login/Logout</a>
                    </li>
                </ul>
            </div>
        </div>
</template>
<script>
    export default {
        props: ['date'],
    }
</script>