import {useMutation, useQueryClient} from "@tanstack/vue-query"
import {DB} from "@/utils/appwrite"
import {DB_ID, COLLECTION_SHOES} from "@/app.constants"

export function useDeleteShoe() {
	const queryClient = useQueryClient(); 

	return useMutation({
	mutationKey: ["delete-shoe"],
	mutationFn: async (itemId:string) => 
		DB.deleteDocument(DB_ID, COLLECTION_SHOES, itemId),
	onSuccess() {
		queryClient.invalidateQueries(["shoes"]);
	}
	});
}