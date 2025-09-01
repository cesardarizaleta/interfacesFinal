<template>
    <!-- About section start -->
	<section id="about-section" class="px-12 lg:px-32 py-16 border-t relative">
        <!-- Main text start -->
		<h1 class="uppercase text-5xl mb-4 font-semibold font-title">
			ABOUT US
		</h1>
		<p class="capitalize xl:w-1/2 mb-8 font-paragraph">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint quia quos, 
            nesciunt id esse magnam facere eveniet ea laborum minus illo earum! Dolorum repellat eos, 
            quod tempora omnis magni blanditiis eligendi nesciunt aut sapiente nemo distinctio placeat voluptas facilis deserunt quaerat, 
            voluptatem hic accusamus dicta, eaque asperiores qui quasi?
		</p>
		<!-- Main text end -->

        <!-- "More" link start -->
        <a href="#" class="text-end">
            <p class="font-semibold text-lg group relative">
                <span>Read more </span>
                <i class="fa-solid fa-arrow-right"></i>
            </p>
        </a>
        <!-- "More" link end -->

        <!-- Circle start -->
        <div class="bg-stone-100 h-44 w-44 md:h-52 md:w-52 rounded-full absolute top-0 -left-20 mt-16 -z-20 opacity-50"></div>
        <!-- Circle end -->
	</section>
	<!-- About section end -->
</template>

<style scoped>
h1, p {
    color: var(--color-text);
}

.border-t {
    border-color: var(--color-primary);
}

.bg-stone-100 {
    background-color: var(--color-primary);
    opacity: 0.1;
}

a {
    color: var(--color-primary);
}

a:hover {
    color: var(--color-secondary);
}
</style>