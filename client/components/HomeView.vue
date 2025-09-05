<template>

	<!-- Main section start -->
	<main-section></main-section>
	<!-- Main section end -->

	<!-- About section start -->
	<about-section></about-section>
	<!-- About section end -->

	<!-- Image Carousel start -->
	<image-carousel></image-carousel>
	<!-- Image Carousel end -->

	<!-- Video Carousel start -->
	<video-carousel></video-carousel>
	<!-- Video Carousel end -->

	<!-- Services section start -->
	<service-section></service-section>
	<!-- Services section end -->

	<!-- Portfolio section start -->
	<portfolio-section></portfolio-section>
	<!-- Portfolio section end -->


	<!-- Contact section start -->
	<contact-section></contact-section>
	<!-- Contact section end -->

</template>

<script>
import MainSection from '@/components/sections/MainSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import ServiceSection from '@/components/sections/ServiceSection.vue';
import PortfolioSection from '@/components/sections/PortfolioSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import ImageCarousel from '@/components/ImageCarousel.vue';
import VideoCarousel from '@/components/VideoCarousel.vue';

export default {
	components: {
		MainSection,
		AboutSection,
		ServiceSection,
		PortfolioSection,
		ContactSection,
		ImageCarousel,
		VideoCarousel,
	}
}
</script>

<style scoped>


</style>