<script setup lang="ts">
import { useGetShoes } from "@/composables/useGetShoes";
import { useCreateShoe } from "@/composables/useCreateShoe";
import type { Shoes } from "@/types/shoes"

// Destructure properties from the query result
const { data: shoes, isPending, isError, error } = useGetShoes();
const { mutate, isPending: isPendingCreation, isError: isErrorCreation } = useCreateShoe();

const addShoe = async () => {
	const shoe: Shoes = {
		name: 'Adidas-rtx-50',
		price: 445.59,
		description: 'Sport Shoes',
		foto_url: 'https://cloud.appwrite.io/v1/storage/buckets/storage/files/67605d61003c1fdbcad8/view?project=vue-query&project=vue-query&mode=admin'
	}
	mutate(shoe)
}

</script>

<template>
	<div class="p-5">
		<!-- Loading State -->
		<div v-if="isPending" class="text-center text-blue-500">
			Loading...
		</div>

		<!-- Shoes List -->
		<div v-else-if="shoes && shoes.length >= 1" class="w-full border">
			<div class="grid grid-cols-5">
				<div v-for="shoe in shoes" :key="shoe.$id" class="p-2">
					<div
						class="border hover:scale-105 p-2 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
						<div class="flex justify-center">
							<NuxtImg :src="shoe.foto_url" width="200" />
						</div>
						<div>
							{{ shoe.name }}
						</div>
						<div>
							{{ shoe.price }}
						</div>
						<div>
							{{ shoe.description }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Error State -->
		<div v-else-if="isError" class="text-center text-red-500">
			{{ error?.message || "An unknown error occurred." }}
		</div>

		<!-- No Shoes Found -->
		<div v-else class="text-center text-gray-500">
			No shoes found.
		</div>

		<div class="w-full mt-5 flex justify-center">
			<button @click="addShoe" class="border rounded p-2 bg-gray-400 text-white" type="button">
				Add Shoe
			</button>
		</div>

		<div v-if="isPendingCreation" class="text-blue-500">
			Adding shoe...
		</div>

		<!-- Error State -->
		<div v-if="isErrorCreation" class="text-red-500">
			Failed to add shoe.
		</div>
	</div>
</template>

<style scoped>
/* Example styles for better user feedback */
.text-center {
	text-align: center;
}

.text-blue-500 {
	color: #3b82f6;
}

.text-red-500 {
	color: #ef4444;
}

.text-gray-500 {
	color: #6b7280;
}

.border-b {
	border-bottom: 1px solid #d1d5db;
}
</style>
