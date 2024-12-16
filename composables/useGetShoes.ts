import { useQuery } from "@tanstack/vue-query"
import {DB} from "@/utils/appwrite"
import {DB_ID, COLLECTION_SHOES} from "@/app.constants"
import type {Shoes} from "@/types/shoes"

const fetchShoes = async (): Promise<Shoes[]> => {
	const response = await DB.listDocuments(DB_ID, COLLECTION_SHOES);
	if (response && Array.isArray(response.documents)) {
	return response.documents as unknown as Shoes[];
	} else {
	throw new Error("Invalid response from DB");
	}
};

export  function useGetShoes(){
	return useQuery({
		queryKey: ['shoes'],
		queryFn: fetchShoes,
	});
	};
