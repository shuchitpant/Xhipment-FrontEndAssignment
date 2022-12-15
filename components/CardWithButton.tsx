import { User } from "firebase/auth";
import { NextPage } from "next";
import React from "react";

interface Props {
	posts: {};
}

const CardWithButton: NextPage<Props> = (props) => {
	const { posts } = props;
	//Edit and delete will also have to be passed here.
	return (
		<div className="border border-primary-orange bg-transparent max-w-7xl p-4 mb-5 rounded-lg">
			<div className="text-primary-orange">commanding officer</div>
			<div className="mt-3 text-primary-white">
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, alias
					sequi! Voluptate officiis unde a vero amet. Accusamus aperiam
					necessitatibus aspernatur dolores neque, magni autem modi nesciunt
					reiciendis pariatur harum vel expedita nemo nulla, minima vitae sit
					voluptatibus velit a molestiae saepe. Iure architecto unde soluta
					laborum est vero aliquam officiis veritatis nulla non commodi animi
					eius nesciunt accusantium debitis quis autem, velit corrupti corporis
					quia voluptatem quo quidem, dolores quae. Fugiat corrupti esse
					mollitia officiis ipsam odio porro fugit minus illo velit ullam culpa
					nesciunt numquam, labore ad facere quas vel eveniet quibusdam dolores
					consectetur, alias delectus unde. Voluptatem?
				</p>
			</div>
			<div className=" flex">
				<button>edit</button>

				<button>delete</button>
			</div>
		</div>
	);
};

export default Card;
