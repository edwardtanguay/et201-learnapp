import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { SiOneplus } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import { FaFloppyDisk } from "react-icons/fa6";

export const PageManageFlashcards = () => {
	const { flashcards } = useContext(AppContext);
	const [isAdding, setIsAdding] = useState(true);
	return (
		<>
			<p>There are {flashcards.length} flashcards:</p>
			<table className="mt-4 dataTable w-[80rem]">
				<thead>
					<tr>
						<th>SUIID</th>
						<th>Category</th>
						<th>Front</th>
						<th>Back</th>
						<th>
							<div className="flex justify-center">
								<SiOneplus onClick={() => setIsAdding(!isAdding)} className="text-2xl cursor-pointer text-[#222] hover:text-[#1d411b]" />
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{isAdding && (
						<tr>
							<td></td>
							<td>
								<input className="w-full" />
							</td>
							<td>
								<input className="w-full" />
							</td>
							<td>
								<input className="w-full" />
							</td>
							<td>
								<div className="flex gap-2">
									<FaFloppyDisk className="cursor-pointer text-[#222] hover:text-[#1d411b]" />
									<MdCancel className="cursor-pointer text-[#222] hover:text-[#592727]" />
								</div>
							</td>
						</tr>
					)}
					{flashcards.map((flashcard) => {
						return (
							<tr>
								<td className="font-mono">{flashcard.suuid}</td>
								<td>{flashcard.category}</td>
								<td>{flashcard.front}</td>
								<td>{flashcard.back}</td>
								<td>
									<div className="flex gap-2">
										<FaPencilAlt className="cursor-pointer text-[#222] hover:text-[#1d411b]" />
										<FaRegTrashAlt className="cursor-pointer text-[#222] hover:text-[#592727]" />
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
