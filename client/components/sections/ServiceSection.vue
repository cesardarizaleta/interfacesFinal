<template>
    <!-- Services section start -->
	<section id="services-section" class="px-12 lg:px-32 py-16 relative overflow-hidden bg-light">
        <!-- Background decorative elements -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-primary opacity-5 rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 bg-accent opacity-5 rounded-full"></div>

        <!-- Text wrapper start -->
        <div class="flex gap-8 flex-col md:flex-row relative z-10">
            <!-- Main text start -->
            <h1 class="uppercase text-5xl mb-4 font-semibold text-primary fade-in font-title">
                OUR SERVICES
            </h1>
            <p class="capitalize xl:w-1/2 mb-8 text-dark slide-in-left font-paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate iure rem harum, quam magnam accusamus inventore incidunt nihil, fuga soluta earum!
                Voluptatibus, recusandae. Cumque sequi ullam, nostrum voluptatum eius saepe.
            </p>
            <!-- Main text end -->
        </div>
        <!-- Text wrapper end -->

        <!-- Services start -->
        <div class="flex flex-col md:flex-row md:gap-8 relative z-10">
            <!-- Wedding service start -->
            <div class="service-card flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start my-8 md:w-1/3 slide-in-left">
                <img src="@/assets/services/wedding.png" alt="Wedding" class="service-image -z-50 md:mb-4 transition-all duration-500 hover:scale-105">
                <div class="w-2/3 text-right md:text-left md:w-full">
                    <h1 class="uppercase text-2xl font-semibold text-primary mb-2 font-subtitle">
                        Wedding
                    </h1>
                    <p class="capitalize text-dark font-paragraph">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, neque?
                    </p>
                </div>
            </div>
            <!-- Wedding service end -->

            <!-- Lifestyle service start -->
            <div class="service-card flex flex-row md:flex-col justify-between items-center md:items-start my-8 md:w-1/3 fade-in">
                <div class="w-2/3 text-left md:w-full md:order-2">
                    <h1 class="uppercase text-2xl font-semibold text-primary mb-2 font-subtitle">
                        Lifestyle
                    </h1>
                    <p class="capitalize text-dark font-paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ratione!
                    </p>
                </div>
                <img src="@/assets/services/lifestyle.png" alt="Lifestyle" class="service-image -z-50 md:mb-4 md:order-1 transition-all duration-500 hover:scale-105">
            </div>
            <!-- Lifestyle service end -->

            <!-- Moments service start -->
            <div class="service-card flex flex-row md:flex-col justify-between items-center md:items-start my-8 md:w-1/3 slide-in-right">
                <div class="w-1/3">
                    <img src="@/assets/services/moments.png" alt="Moments" class="service-image -z-50 md:mb-4 transition-all duration-500 hover:scale-105">
                </div>
                <div class="w-2/3 text-right md:text-left md:w-full">
                    <h1 class="uppercase text-2xl font-semibold text-primary mb-2 font-subtitle">
                        Moments
                    </h1>
                    <p class="capitalize text-dark font-paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, molestias.
                    </p>
                </div>
            </div>
            <!-- Moments service end -->
        </div>
        <!-- Services end -->

        <!-- Decorative circle -->
        <div class="bg-neutral h-64 w-64 rounded-full absolute top-0 -right-20 mt-16 -z-20 opacity-20"></div>
	</section>
	<!-- Services section end -->
</template>

<style scoped>
.service-card {
  padding: 1rem;
  transition: all var(--transition-normal);
  border-radius: 8px;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow-primary);
}

.service-image {
  max-width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.service-image:hover {
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .service-card {
    flex-direction: row !important;
    align-items: center;
  }

  .service-image {
    width: 30%;
    margin-right: 1rem;
  }
}
</style>