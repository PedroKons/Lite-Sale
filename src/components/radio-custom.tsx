import * as RadioGroup from "@radix-ui/react-radio-group";
const options = [
  {
    value: "cpf",
    label: "Pessoa Física",
  },
  {
    value: "cnpj",
    label: "Pessoa Jurídica",
  },
];
const RadioCardsDemo = ({ setIsJuridica, setIsFisica }) => {

  return (
    <RadioGroup.Root
      defaultValue={options[0].value}
      className="max-w-sm w-full grid grid-cols-3 gap-3"
      onValueChange={(value) => {
        if (value === "cpf") {
          setIsFisica(true);
          setIsJuridica(false);
        } else {
          setIsFisica(false);
          setIsJuridica(true);
        }
      }}
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="ring-[1px] ring-border rounded py-1 px- data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
        >
          <span className="font-semibold tracking-tight">{option.label}</span>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
export default RadioCardsDemo;