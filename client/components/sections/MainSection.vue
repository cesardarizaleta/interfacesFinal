<template>
    <!-- Main section start -->
	<section class="h-screen px-12 lg:px-32 py-32 mb-8">
		<div class="w-full md:w-1/2 h-full flex flex-col md:justify-center">
			<!-- Main text start -->
			<h1 class="uppercase text-5xl xl:text-7xl mb-4 font-semibold">
				CAPTURING
				BEAUTY PHOTO
			</h1>
			<p class="capitalize xl:w-1/2">
				a camera is an optical instrument that captures a visual image at their most basic, cameras are sealed
			</p>
			<!-- Main text end -->

			<!-- Social links start -->
			<div class="flex mt-3 gap-8">
				<a href="#">
					<i class="fa-brands fa-instagram socialIcon"></i>
				</a>
				<a href="#">
					<i class="fa-brands fa-linkedin socialIcon"></i>
				</a>
				<a href="#">
					<i class="fa-brands fa-facebook socialIcon"></i>
				</a>
				<a href="#">
					<i class="fa-brands fa-dribbble socialIcon"></i>
				</a>
				<a href="#">
					<i class="fa-brands fa-pinterest socialIcon"></i>
				</a>
			</div>
			<!-- Social links end -->
		</div>

		<!-- Photographer image start -->
		<div class="absolute bottom-0 right-0 overflow-hidden h-2/5 sm:h-1/2 md:h-3/5 lg:h-4/6 photographer-container">
			<img src="~/assets/image.jpg" alt="Photographer" class="h-full photographer-image">
		</div>
	</section>
</template>

<style scoped>
.socialIcon {
    font-size: 1.5rem;
    color: var(--color-text);
}

.photographer-container {
    z-index: -1;
}

.photographer-image {
    object-fit: cover;
    width: 100%;
}
</style>
