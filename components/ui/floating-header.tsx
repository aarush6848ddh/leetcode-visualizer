'use client';

import React from 'react';
import { Code, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingHeaderProps {
	view: 'hero' | 'topics' | 'problems';
	setView: (view: 'hero' | 'topics' | 'problems') => void;
}

export function FloatingHeader({ view, setView }: FloatingHeaderProps) {
	const [open, setOpen] = React.useState(false);

	const links = [
		{ label: 'Home', view: 'hero' as const },
		{ label: 'Topics', view: 'topics' as const },
		{ label: 'Problems', view: 'problems' as const },
	];

	return (
		<header
			className={cn(
				'sticky top-0 z-50',
				'w-full max-w-4xl mx-auto rounded-lg border border-green-500/30 shadow-lg shadow-green-500/10',
				'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg',
			)}
		>
			<nav className="mx-auto flex items-center justify-between px-6 py-12">
				<div 
					className="hover:bg-green-500/10 flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 duration-100 transition-colors"
					onClick={() => setView('hero')}
				>
					<Code className="w-6 h-6 text-green-400" />
					<p className="font-mono text-lg font-bold text-green-400">LeetCode Visualizer</p>
				</div>
				<div className="flex items-center gap-4">
					<div className="hidden items-center gap-4 lg:flex">
						{links.map((link) => (
							<button
								key={link.label}
								onClick={() => setView(link.view)}
								className={cn(
									'px-5 py-3 text-base font-medium rounded-md transition-all duration-200',
									view === link.view
										? 'bg-green-500/20 text-green-400'
										: 'text-green-400/80 hover:text-green-400 hover:bg-green-500/10'
								)}
							>
								{link.label}
							</button>
						))}
					</div>
					<Sheet open={open} onOpenChange={setOpen}>
						<Button
							size="icon"
							variant="outline"
							onClick={() => setOpen(!open)}
							className="lg:hidden"
						>
							<MenuIcon className="size-4" />
						</Button>
						<SheetContent
							className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
							showClose={false}
							side="left"
						>
							<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
								{links.map((link) => (
									<button
										key={link.label}
										onClick={() => {
											setView(link.view);
											setOpen(false);
										}}
										className={buttonVariants({
											variant: 'ghost',
											className: 'justify-start',
										})}
									>
										{link.label}
									</button>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
