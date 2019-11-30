<template>
    <div>
        <div class="container my-5">
            <div class="text-center my-5">
                <h3>
                    "The fish sees the bait not the hook; a man sees not the danger — only the profit."
                </h3>
                <p>-Mongolian Proverb</p>
            </div>
            <div class="row intro-container">
                <div class="col-md-5">
                    <img src="../assets/img/fishing.svg" class="img-fluid" alt="fishing">
                </div>
                <div class="col-md-7">
                    <h2>The Healthiest and Freshest Fish.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in massa non nibh laoreet pellentesque. Integer aliquam metus est, vel molestie purus fringilla vitae. Duis facilisis ligula ac elit commodo tempus. Nulla ac aliquet ipsum. Proin ut leo lacinia, aliquet diam nec, venenatis lectus. Cras ac pellentesque neque. Pellentesque consequat ut nunc vitae hendrerit. Ut scelerisque suscipit elit sed dictum. Curabitur rhoncus lacus purus, eu blandit felis fermentum malesuada. Praesent id metus porttitor, accumsan odio vel, dapibus dui. Ut sagittis placerat risus, at dignissim massa bibendum a. </p>
                    <p>
                        Sed vel nunc quis mi tempus sagittis quis eu ipsum. Nam ac nulla quis ante vulputate hendrerit vel sed velit. Nunc quis arcu ac erat congue mollis sed dignissim nisi. Proin feugiat massa id quam consectetur, ac finibus lectus consequat. In hac habitasse platea dictumst. Mauris suscipit scelerisque erat sit amet commodo. Nulla mollis mauris ut imperdiet mollis. Nunc feugiat ante at orci imperdiet malesuada.
                    </p>
                </div>
                <div class="col-12">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in massa non nibh laoreet pellentesque. Integer aliquam metus est, vel molestie purus fringilla vitae. Duis facilisis ligula ac elit commodo tempus. Nulla ac aliquet ipsum. Proin ut leo lacinia, aliquet diam nec, venenatis lectus. Cras ac pellentesque neque. Pellentesque consequat ut nunc vitae hendrerit. Ut scelerisque suscipit elit sed dictum. Curabitur rhoncus lacus purus, eu blandit felis fermentum malesuada. Praesent id metus porttitor, accumsan odio vel, dapibus dui. Ut sagittis placerat risus, at dignissim massa bibendum a. </p>
                </div>
            </div>
            <hr>
            <div class="row environment-container">
                <div class="col-md-7">
                    <h2>Environment Friendly</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in massa non nibh laoreet pellentesque. Integer aliquam metus est, vel molestie purus fringilla vitae. Duis facilisis ligula ac elit commodo tempus. Nulla ac aliquet ipsum. Proin ut leo lacinia, aliquet diam nec, venenatis lectus. Cras ac pellentesque neque. Pellentesque consequat ut nunc vitae hendrerit. Ut scelerisque suscipit elit sed dictum. Curabitur rhoncus lacus purus, eu blandit felis fermentum malesuada. Praesent id metus porttitor, accumsan odio vel, dapibus dui. Ut sagittis placerat risus, at dignissim massa bibendum a. </p>
                    <p>Proin ullamcorper blandit sapien, vitae efficitur felis hendrerit vel. Praesent imperdiet ante at libero semper, a blandit tellus sagittis. Duis porttitor metus mauris, eget pulvinar dolor molestie a. Pellentesque fringilla rutrum leo quis volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras et arcu non nibh fermentum gravida vel vel sem. Nulla dui lacus, suscipit ac nulla sit amet, tempus finibus lacus. Curabitur maximus justo a metus vestibulum, at porta tellus venenatis. Proin auctor libero at diam luctus accumsan. Quisque non ultricies enim. </p>
                </div>
                <div class="col-md-5">
                    <img src="../assets/img/environment.svg" class="img-fluid" alt="environment">
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script>
    import Footer from "../components/Footer";
    export default {
        name: "About",
        components: {
            Footer
        }
    }
</script>
<style scoped>
    p,
    h1,
    h2 {
        font-family: 'Cabin', sans-serif;
    }
</style>