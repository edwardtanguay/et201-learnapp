import { useContext } from "react";
import { AppContext } from "../AppContext";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { SiOneplus } from "react-icons/si";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	return (
		<>
			<p>There are {flashcards.length} flashcards:</p>
			<table className="mt-4 dataTable">
				<thead>
					<tr>
						<th>SUIID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
						<th>
							<div className="flex justify-center">
								<SiOneplus className="text-2xl cursor-pointer text-[#222] hover:text-[#000]" />
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{flashcards.map((flashcard) => {
						return (
							<tr>
								<td>{flashcard.suuid}</td>
								<td>{flashcard.category}</td>
								<td>{flashcard.front}</td>
								<td>{flashcard.back}</td>
								<td>
									<div className="flex gap-2">
										<FaPencilAlt className="cursor-pointer text-[#222] hover:text-[#000]" />{" "}
										<FaRegTrashAlt className="cursor-pointer text-[#222] hover:text-[#000]" />
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
