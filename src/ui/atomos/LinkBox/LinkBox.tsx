export interface LinkBoxProps {
	/** Link description */
	children: string;
	link: {
		text: string;
		href: string;
		isNewWindow?: boolean;
	};
}

export const LinkBox = ({ link, children }: LinkBoxProps) => (
	<a
		className="group block rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
		href={link.href}
		{...(link.isNewWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
	>
		<h2 className={`mb-3 text-2xl font-semibold`}>
			{`${link.text} `}
			<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
				-&gt;
			</span>
		</h2>
		<p className={`m-0 max-w-[30ch] text-balance text-sm opacity-50`}>{children}</p>
	</a>
);
