interface generationOption
{
  small: boolean;
}

export function generate(input: string, opts?: generationOption, callback?: Function): void;
