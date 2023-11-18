import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { Heading } from '@components';
import { urls } from '~/utils/urls';

export default component$(() => {
  return (
    <div>
      <Heading text="Match Mate" />
      <Link
        href={urls.tournamentCreate}
      >{$localize`Start a new tournament`}</Link>
      <p>
        <Link href={urls.tournaments}>{$localize`Tournaments overview`}</Link>
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: $localize`Match Mate`,
  meta: [
    {
      name: 'description',
      content: `Match Mate track of your tournament`,
    },
  ],
};
