<template>
    <!-- Portfolio section start -->
	<section id="portfolio-section" class="px-4 lg:px-8 py-16 relative bg-light overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute top-20 left-20 w-40 h-40 bg-accent opacity-5 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-20 w-32 h-32 bg-primary opacity-5 rounded-full blur-xl"></div>

        <!-- Text wrapper start -->
        <div class="flex gap-8 flex-col md:flex-row relative z-10">
            <!-- Main text start -->
            <h1 class="uppercase text-5xl mb-4 font-semibold text-primary fade-in font-title">
                OUR PORTFOLIO
            </h1>
            <p class="capitalize xl:w-1/2 mb-8 text-dark slide-in-left font-paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolores distinctio reiciendis obcaecati ea.
            </p>
            <!-- Main text end -->
        </div>
        <!-- Text wrapper end -->

        <!-- Images grid start -->
		<div class="grid-cols-2 md:grid-cols-5 grid mb-8 gap-4 relative z-10">
            <div class="grid grid-cols-1 md:hidden gap-4">
                <img src="@/assets/portfolio/portfolio1.jpg" alt="1" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio2.jpg" alt="2" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio3.jpg" alt="3" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio4.jpg" alt="4" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio5.jpg" alt="5" class="portfolio-image rounded-xl">
            </div>
            <div class="grid grid-cols-1 md:hidden gap-4">
                <img src="@/assets/portfolio/portfolio6.jpg" alt="6" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio7.jpg" alt="7" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio8.jpg" alt="8" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio9.jpg" alt="9" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio10.jpg" alt="10" class="portfolio-image rounded-xl">
            </div>

            <div class="hidden md:flex flex-col gap-4">
                <img src="@/assets/portfolio/portfolio1.jpg" alt="1" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio2.jpg" alt="2" class="portfolio-image rounded-xl">
            </div>
            <div class="hidden md:flex flex-col gap-4">
                <img src="@/assets/portfolio/portfolio3.jpg" alt="1" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio4.jpg" alt="2" class="portfolio-image rounded-xl">
            </div>
            <div class="hidden md:flex flex-col gap-4">
                <img src="@/assets/portfolio/portfolio8.jpg" alt="2" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio5.jpg" alt="2" class="portfolio-image rounded-xl">
            </div>
            <div class="hidden md:flex flex-col gap-4">
                <img src="@/assets/portfolio/portfolio7.jpg" alt="1" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio6.jpg" alt="2" class="portfolio-image rounded-xl">
            </div>
            <div class="hidden md:flex flex-col gap-4">
                <img src="@/assets/portfolio/portfolio9.jpg" alt="1" class="portfolio-image rounded-xl">
                <img src="@/assets/portfolio/portfolio10.jpg" alt="2" class="portfolio-image rounded-xl">
            </div>
        </div>
		<!-- Images grid end -->

        <!-- "More" link start -->
        <div class="text-end relative z-10">
            <a href="#" class="font-semibold text-lg group inline-flex items-center hover:text-primary transition-all duration-300">
                <span class="mr-2">Show more photos</span>
                <i class="fa-solid fa-arrow-right icon-accent group-hover:translate-x-1 transition-transform duration-300"></i>
            </a>
        </div>
        <!-- "More" link end -->

        <!-- Decorative circle -->
        <div class="bg-neutral h-64 w-64 rounded-full absolute top-0 left-0 mt-16 -z-20 opacity-20"></div>
	</section>
	<!-- Portfolio section end -->
</template>

<style scoped>
.portfolio-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: all var(--transition-normal);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.portfolio-image:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .portfolio-image {
    border-radius: 12px !important;
  }
}

@media (max-width: 640px) {
  .portfolio-image {
    border-radius: 8px !important;
  }
}
</style>