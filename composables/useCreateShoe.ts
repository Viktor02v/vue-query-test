import {useMutation, useQueryClient} from "@tanstack/vue-query"
import {DB} from "@/utils/appwrite"
import {DB_ID, COLLECTION_SHOES} from "@/app.constants"
import { v4 as uuid } from 'uuid';
import type {Shoes} from "@/types/shoes"

export function useCreateShoe() {
	const queryClient = useQueryClient(); // Get the query client

	return useMutation({
	mutationKey: ["create-shoe"],
	mutationFn: async (shoe: Shoes) => 
		DB.createDocument(DB_ID, COLLECTION_SHOES, uuid(), shoe),
	onSuccess() {
		 // Trigger a refetch of the shoes list after successful mutation
		queryClient.invalidateQueries(["shoes"]);
	}
	});
}