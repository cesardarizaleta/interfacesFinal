<template>
    <!-- Main section start -->
	<section class="h-screen px-12 lg:px-32 py-32 mb-8 bg-light relative overflow-hidden">
		<div class="w-full md:w-1/2 h-full flex flex-col md:justify-center relative z-10">
			<!-- Main text start -->
			<h1 class="uppercase text-5xl xl:text-7xl mb-4 font-semibold text-primary fade-in font-title">
				CAPTURING
				BEAUTY PHOTO
			</h1>
			<p class="capitalize xl:w-1/2 text-lg leading-relaxed text-dark slide-in-left font-paragraph">
				a camera is an optical instrument that captures a visual image at their most basic, cameras are sealed
			</p>
			<!-- Main text end -->

			<!-- Social links start -->
			<div class="flex mt-8 gap-8 slide-in-right">
				<a href="#" class="icon-accent hover:text-primary transition-all duration-300 transform hover:scale-110">
					<i class="fa-brands fa-instagram text-2xl"></i>
				</a>
				<a href="#" class="icon-accent hover:text-primary transition-all duration-300 transform hover:scale-110">
					<i class="fa-brands fa-linkedin text-2xl"></i>
				</a>
				<a href="#" class="icon-accent hover:text-primary transition-all duration-300 transform hover:scale-110">
					<i class="fa-brands fa-facebook text-2xl"></i>
				</a>
				<a href="#" class="icon-accent hover:text-primary transition-all duration-300 transform hover:scale-110">
					<i class="fa-brands fa-dribbble text-2xl"></i>
				</a>
				<a href="#" class="icon-accent hover:text-primary transition-all duration-300 transform hover:scale-110">
					<i class="fa-brands fa-pinterest text-2xl"></i>
				</a>
			</div>
			<!-- Social links end -->
		</div>

		<!-- Photographer image start -->
		<div class="absolute bottom-0 right-0 overflow-hidden h-2/5 sm:h-1/2 md:h-3/5 lg:h-4/6 photographer-container">
			<img src="~/assets/image.jpg" alt="Photographer" class="h-full photographer-image transition-all duration-500 hover:scale-105">
		</div>

		<!-- Decorative elements -->
		<div class="absolute top-20 right-20 w-32 h-32 bg-primary opacity-10 rounded-full blur-xl"></div>
		<div class="absolute bottom-20 left-20 w-24 h-24 bg-accent opacity-10 rounded-full blur-lg"></div>
	</section>
</template>

<style scoped>
.photographer-container {
    z-index: -1;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
}

.photographer-image {
    object-fit: cover;
    width: 100%;
    transition: all var(--transition-normal);
}

.photographer-image:hover {
    transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .photographer-container {
        height: 30% !important;
    }
}

@media (max-width: 640px) {
    .photographer-container {
        height: 25% !important;
    }
}
</style>
