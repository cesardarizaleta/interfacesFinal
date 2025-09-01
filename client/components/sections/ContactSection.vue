<template>
    <!-- Contact section start -->
	<section id="contact-section" class="px-12 lg:px-32 py-16 relative">
        <!-- Main text start -->
		<h1 class="uppercase text-5xl mb-4 font-semibold">
			Contact us
		</h1>
		<!-- Main text end -->

        <!-- Form start -->
        <div class="grid grid-cols-1 md:grid-cols-2 w-full">
            <div class="hidden md:flex justify-center items-center">
                <img src="@/assets/camera.png" alt="">
            </div>
            <div class="flex flex-col w-full items-center">
                <div class="flex flex-col items-center w-full max-w-xs px-2 mb-6">
                    <p class="text-xs sm:text-sm mt-2">E-mail address</p>
                    <input 
                        type="email" 
                        name="user_email" 
                        id="user_email" 
                        placeholder="example@domain.com" 
                        class="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base"
                    >
                </div>

                <p class="text-xs sm:text-sm mt-2">Message</p>
                <div class="flex flex-col items-center w-full max-w-xs px-2 mb-6">
                    <textarea 
                        name="user_message" 
                        id="user_message" 
                        cols="30" 
                        rows="10" 
                        placeholder="Type your message here..."
                        class="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base resize-vertical"
                    ></textarea>
                </div>

                <button class="btn w-full md:w-1/2">Send</button>
            </div>
        </div>
        <!-- Form end -->

        <!-- Circle start -->
        <div class="bg-stone-100 h-44 w-44 md:h-52 md:w-52 rounded-full absolute -top-20 left-0 mt-16 -z-20 opacity-50"></div>
        <!-- Circle end -->
	</section>
	<!-- Contact section end -->
</template>

<style scoped>
h1, p {
    color: var(--color-text);
}

input, textarea {
    color: var(--color-text);
    border-color: var(--color-primary);
}

input:focus, textarea:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary);
}

.btn {
    background-color: var(--color-primary);
    color: white;
}

.btn:hover {
    background-color: var(--color-secondary);
}

.bg-stone-100 {
    background-color: var(--color-primary);
    opacity: 0.1;
}

::placeholder {
    color: var(--color-text-light);
    opacity: 0.7;
}

.contact-section {
  width: 100%;
  background-color: var(--color-background);
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.contact-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.contact-header p {
  font-size: 1.125rem;
  color: var(--color-text);
  max-width: 600px;
  margin: 0 auto;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.contact-form {
  width: 100%;
  max-width: 600px;
  background-color: var(--color-background);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.25rem;
  font-size: 1rem;
  color: var(--color-text);
  background-color: var(--color-background);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--color-secondary);
}

.contact-info {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-text);
}

.info-icon {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.info-text {
  font-size: 1rem;
}

.decorative-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: var(--color-primary);
  opacity: 0.1;
  z-index: 0;
}

.circle-1 {
  top: -150px;
  left: -150px;
}

.circle-2 {
  bottom: -150px;
  right: -150px;
}

@media (min-width: 768px) {
  .contact-content {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  .contact-form,
  .contact-info {
    flex: 1;
  }
}
</style>