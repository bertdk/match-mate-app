import { component$, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  Form,
  routeAction$,
  useNavigate,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { BasicInput, Button } from "@components";
import { createTournament } from "~/data/tournaments.api";

const formSchema = {
  name: z.string().min(1).max(255),
  pointsOnWin: z.coerce.number().min(0).max(100),
  pointsOnTie: z.coerce.number().min(0).max(100),
  pointsOnLoss: z.coerce.number().min(0).max(100),
};
export const useCreateTournament = routeAction$(async (input) => {
  return createTournament(input);
}, zod$(formSchema));

export default component$(() => {
  const nav = useNavigate();
  const action = useCreateTournament();

  useTask$(({ track }) => {
    track(() => action.value?.name);
    if (action.value?.name) {
      nav(`/tournaments/${action.value.id}`);
    }
  });

  return (
    <>
      <Form action={action} class="flex flex-col">
        <BasicInput
          text="Name"
          id="name"
          placeholder="Enter the tournament name"
          type="text"
          error={action.value?.fieldErrors?.name}
          autoFocus
        />
        <div class="flex justify-between">
          <BasicInput
            text="Points for a win"
            id="pointsOnWin"
            type="number"
            error={action.value?.fieldErrors?.pointsOnWin}
          />
          <BasicInput
            text="Points for a tie"
            id="pointsOnTie"
            type="number"
            error={action.value?.fieldErrors?.pointsOnTie}
          />
          <BasicInput
            text="Points for a loss"
            id="pointsOnLoss"
            type="number"
            error={action.value?.fieldErrors?.pointsOnLoss}
          />
        </div>
        <div class="place-self-end">
          <Button text="Submit" type="submit" />
        </div>
      </Form>

      {action.value && !action.value.failed && (
        <p>{`Tournament ${action.value.name} created successfully`}</p>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Create tournament",
};
