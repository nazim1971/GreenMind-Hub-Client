'use client';

import { useUser } from '@/context/UserContext';
import Link from 'next/link';

const ContributePart = () => {
  const { user } = useUser();
  return (
    <section className="text-center py-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Want to contribute to our blog?
      </h2>
      <p className="dark:text-white mb-6">
        We&apos;re always looking for new voices to share sustainable living
        tips, project case studies, and environmental insights.
      </p>
      <Link
        href={
          user
            ? user.role === 'MEMBER'
              ? '/member/create-idea'
              : '/'
            : '/login'
        }
        className="inline-block px-6 py-3 bg-[#14B8A6] text-white font-medium rounded-lg hover:bg-[#6dd0c5] transition-colors"
      >
        Submit Your Article Idea
      </Link>
    </section>
  );
};

export default ContributePart;