import React, { useState } from 'react';
import { VINTAGE_POSTMARKS, PostmarkPreset } from '../../vintageLibrary';

interface Props {
  onAddPostmark: (config: {
    city: string;
    dateStr: string;
    department: string;
    style: 'double-ring' | 'single-ring-wavy' | 'airmail-box' | 'censorship-seal' | 'cancellation-bars';
    inkColor: string;
  }) => void;
}

export const PostmarksPanel: React.FC<Props> = ({ onAddPostmark }) => {
  const [selectedPreset, setSelectedPreset] = useState<PostmarkPreset>(VINTAGE_POSTMARKS[0]);
  const [city, setCity] = useState(VINTAGE_POSTMARKS[0].city);
  const [dateStr, setDateStr] = useState(VINTAGE_POSTMARKS[0].dateStr);
  const [department, setDepartment] = useState(VINTAGE_POSTMARKS[0].department);
  const [inkColor, setInkColor] = useState(VINTAGE_POSTMARKS[0].inkColor);

  const inkColors = [
    { label: 'Nero Fumo Annullamento', value: '#1e1c18' },
    { label: 'Seppia Inchiostro', value: '#482d1c' },
    { label: 'Viola Postale Ufficiale', value: '#362447' },
    { label: 'Rosso Ceralacca / Censura', value: '#661b1b' },
    { label: 'Blu Cobalto Posta Aerea', value: '#1c3452' }
  ];

  const handleSelectPreset = (p: PostmarkPreset) => {
    setSelectedPreset(p);
    setCity(p.city);
    setDateStr(p.dateStr);
    setDepartment(p.department);
    setInkColor(p.inkColor);
  };

  const handleAdd = () => {
    onAddPostmark({
      city: city.trim().toUpperCase(),
      dateStr: dateStr.trim(),
      department: department.trim(),
      style: selectedPreset.style,
      inkColor
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-bold tracking-wider text-[#4A3423] mb-2 block uppercase">
          Timbri Postali Gommati & Annulli:
        </label>
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {VINTAGE_POSTMARKS.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                selectedPreset.id === p.id
                  ? 'bg-[#F2E8DC] border-[#A3431D] text-[#24170E] font-bold shadow-xs'
                  : 'bg-[#FAF5ED] border-[#D8C7B5] text-[#5C4533] hover:bg-[#F2EAE0]'
              }`}
            >
              <div>
                <div className="text-xs font-bold font-stamp tracking-wider">{p.name}</div>
                <div className="text-[11px] text-[#705640] font-medium">{p.city} · {p.dateStr}</div>
              </div>
              <span
                className="w-4 h-4 rounded-full border border-black/30 shadow-2xs"
                style={{ backgroundColor: p.inkColor }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Customizer */}
      <div className="border-t border-[#D8C7B5] pt-3 space-y-3 bg-[#FAF5ED] p-3 rounded-lg border">
        <label className="text-xs font-bold tracking-wider text-[#4A3423] block uppercase">
          Personalizza Dicitura del Timbro:
        </label>

        <div>
          <span className="text-xs font-bold text-[#5C4533] block mb-1">Città o Ufficio:</span>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-1.5 text-xs text-[#1E1208] font-stamp uppercase font-bold outline-none focus:border-[#A3431D]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="text-xs font-bold text-[#5C4533] block mb-1">Data d'Affrancatura:</span>
            <input
              type="text"
              value={dateStr}
              onChange={e => setDateStr(e.target.value)}
              placeholder="es. 12 . X . 1928"
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-1.5 text-xs text-[#1E1208] font-stamp font-medium outline-none focus:border-[#A3431D]"
            />
          </div>
          <div>
            <span className="text-xs font-bold text-[#5C4533] block mb-1">Reparto / Dicitura:</span>
            <input
              type="text"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              placeholder="es. PARTENZA"
              className="w-full bg-[#FFFFFF] border-2 border-[#D8C7B5] rounded px-3 py-1.5 text-xs text-[#1E1208] font-stamp font-medium outline-none focus:border-[#A3431D]"
            />
          </div>
        </div>

        {/* Ink Color */}
        <div>
          <span className="text-xs font-bold text-[#5C4533] block mb-1.5">Inchiostro del Timbro:</span>
          <div className="flex gap-2.5">
            {inkColors.map(c => (
              <button
                key={c.value}
                type="button"
                onClick={() => setInkColor(c.value)}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                  inkColor === c.value ? 'border-[#A3431D] scale-110 shadow-sm ring-2 ring-[#A3431D]/30' : 'border-[#CBB7A2]'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
                aria-label={c.label}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-3 px-4 bg-[#A3431D] hover:bg-[#BA5227] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm cursor-pointer"
      >
        + Applica Timbro Postale sulla Cartolina
      </button>
    </div>
  );
};
