import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Trash2, Plus, Edit2, ChevronLeft, Save, RefreshCw } from 'lucide-react';
import type { Game, WalkthroughStep } from '@/data/games';
import { categories } from '@/data/games';
import type { SiteSettings, CtaLink, WalletOption } from '@/types/content';
import { useSiteContent } from '@/context/siteContent';
import { useAuth } from '@/context/auth';
import { createGame, createSection, createStep, updateSection, updateStep } from '@/lib/editor';
import { errorMessage } from '@/lib/validation';
import { ImageInput } from './ImageInput';

interface GameDraft {
  game: Game;
  revision?: number;
  original: string;
}
const serialize = (value: unknown) => JSON.stringify(value);

export function AdminDashboard({ onDirtyChange }: { onDirtyChange: (dirty: boolean) => void }) {
  const site = useSiteContent();
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'assets' | 'games'>('assets');
  const [editing, setEditing] = useState<GameDraft | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(() =>
    structuredClone({
      heroImage: site.heroImage,
      logoImage: site.logoImage,
      ctaLinks: site.ctaLinks,
    }),
  );
  const [settingsOriginal, setSettingsOriginal] = useState(() => serialize(settings));
  const [settingsRevision, setSettingsRevision] = useState(site.settingsRevision);
  const [pending, setPending] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const busy = pending || uploadCount > 0;
  const dirty =
    settingsOriginal !== serialize(settings) ||
    Boolean(
      editing && (editing.revision === undefined || editing.original !== serialize(editing.game)),
    );

  useEffect(() => {
    onDirtyChange(dirty || busy);
    return () => onDirtyChange(false);
  }, [dirty, busy, onDirtyChange]);
  useEffect(() => {
    if (!dirty && !busy) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, busy]);

  if (loading)
    return (
      <p role="status" className="p-8 text-center">
        Checking admin access…
      </p>
    );
  if (!isAdmin || !site.isRemote)
    return (
      <p role="alert" className="p-8 text-center">
        Only a signed-in site admin can access this dashboard.
      </p>
    );

  const onUpload = (uploading: boolean) =>
    setUploadCount((count) => Math.max(0, count + (uploading ? 1 : -1)));
  const changeGame = (update: (game: Game) => Game) =>
    setEditing((current) => (current ? { ...current, game: update(current.game) } : null));
  const changeStep = (sectionId: string, stepId: string, patch: Partial<WalkthroughStep>) =>
    changeGame((game) => updateStep(game, sectionId, stepId, patch));
  const changeLink = (id: string, update: (link: CtaLink) => CtaLink) =>
    setSettings((current) => ({
      ...current,
      ctaLinks: current.ctaLinks.map((link) => (link.id === id ? update(link) : link)),
    }));
  const changeWallet = (linkId: string, index: number, patch: Partial<WalletOption>) =>
    changeLink(linkId, (link) => ({
      ...link,
      wallets: link.wallets?.map((wallet, walletIndex) =>
        walletIndex === index ? { ...wallet, ...patch } : wallet,
      ),
    }));

  const run = async (action: () => Promise<void>, success: string) => {
    if (busy) return;
    setPending(true);
    setError('');
    setMessage('');
    try {
      await action();
      setMessage(success);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setPending(false);
    }
  };
  const beginEdit = (game: Game, revision?: number) => {
    setEditing({ game: structuredClone(game), revision, original: serialize(game) });
    setError('');
    setMessage('');
  };
  const saveGame = (event: FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    void run(async () => {
      await site.saveGame(editing.game, editing.revision);
      setEditing(null);
    }, 'Game published.');
  };
  const saveSettings = (event: FormEvent) => {
    event.preventDefault();
    void run(async () => {
      const revision = await site.saveSettings(settings, settingsRevision);
      setSettingsRevision(revision);
      setSettingsOriginal(serialize(settings));
    }, 'Site settings published.');
  };
  const cancelEdit = () => {
    if (busy) return;
    if (
      editing &&
      (editing.revision === undefined || editing.original !== serialize(editing.game)) &&
      !window.confirm('Discard this unsaved game draft?')
    )
      return;
    setEditing(null);
    setError('');
  };
  const resetSettings = () => {
    if (
      settingsOriginal !== serialize(settings) &&
      !window.confirm('Discard unsaved site settings?')
    )
      return;
    const next = structuredClone({
      heroImage: site.heroImage,
      logoImage: site.logoImage,
      ctaLinks: site.ctaLinks,
    });
    setSettings(next);
    setSettingsOriginal(serialize(next));
    setSettingsRevision(site.settingsRevision);
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-tan-600 mt-2">
            Draft locally, then publish to Supabase. Images upload immediately to public Storage;
            content changes require Save.
          </p>
        </div>
        <button
          disabled={busy || dirty}
          onClick={() => void site.reload()}
          className="flex items-center gap-2 text-earth-600 font-semibold disabled:opacity-50"
          title={dirty ? 'Save or discard drafts before reloading.' : 'Reload published content'}
        >
          <RefreshCw size={16} />
          Reload published content
        </button>
      </div>
      {error && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="mb-4 rounded-xl bg-sage-100 p-4 text-sage-500">
          {message}
        </p>
      )}
      {uploadCount > 0 && (
        <p role="status" className="mb-4 text-tan-600">
          Uploading image to Supabase Storage…
        </p>
      )}

      {editing ? (
        <>
          <button
            disabled={busy}
            onClick={cancelEdit}
            className="flex items-center gap-2 text-tan-600 font-bold mb-6"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <form onSubmit={saveGame}>
            <fieldset
              disabled={busy}
              className="bg-white rounded-2xl p-5 sm:p-8 border-2 border-tan-200 space-y-6 disabled:opacity-70"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-display font-bold">
                  {editing.revision === undefined ? 'Add Game' : 'Edit Game'}
                </h2>
                <SaveButton pending={pending} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Game title">
                  <input
                    required
                    maxLength={200}
                    value={editing.game.title}
                    onChange={(event) =>
                      changeGame((game) => ({ ...game, title: event.target.value }))
                    }
                    className="form-input"
                  />
                </Field>
                <Field label="Developer">
                  <input
                    required
                    maxLength={200}
                    value={editing.game.developer}
                    onChange={(event) =>
                      changeGame((game) => ({ ...game, developer: event.target.value }))
                    }
                    className="form-input"
                  />
                </Field>
                <Field label="Category">
                  <input
                    list="game-categories"
                    required
                    maxLength={100}
                    value={editing.game.category}
                    onChange={(event) =>
                      changeGame((game) => ({ ...game, category: event.target.value }))
                    }
                    className="form-input"
                  />
                  <datalist id="game-categories">
                    {categories
                      .filter((category) => category !== 'All')
                      .map((category) => (
                        <option key={category} value={category} />
                      ))}
                  </datalist>
                </Field>
                <Field label="Accent color">
                  <input
                    required
                    pattern="#[0-9a-fA-F]{6}"
                    value={editing.game.accentColor}
                    onChange={(event) =>
                      changeGame((game) => ({ ...game, accentColor: event.target.value }))
                    }
                    className="form-input"
                  />
                </Field>
              </div>
              <Field label="Game description">
                <textarea
                  required
                  maxLength={10000}
                  value={editing.game.description}
                  onChange={(event) =>
                    changeGame((game) => ({ ...game, description: event.target.value }))
                  }
                  className="form-input min-h-24"
                />
              </Field>
              <ImageInput
                label="Cover image"
                value={editing.game.coverImage}
                onBusyChange={onUpload}
                onChange={(coverImage) => changeGame((game) => ({ ...game, coverImage }))}
              />
              <Field label="Cover image description">
                <input
                  required
                  maxLength={500}
                  value={editing.game.coverAlt}
                  onChange={(event) =>
                    changeGame((game) => ({ ...game, coverAlt: event.target.value }))
                  }
                  className="form-input"
                />
              </Field>
              <h3 className="text-xl font-display font-bold">Walkthrough guides</h3>
              {editing.game.walkthrough.map((section) => (
                <section
                  key={section.id}
                  className="rounded-xl border-2 border-tan-200 bg-cream-50 p-4 space-y-4"
                >
                  <div className="flex items-end gap-2">
                    <Field label="Section title">
                      <input
                        required
                        value={section.title}
                        maxLength={200}
                        onChange={(event) =>
                          changeGame((game) =>
                            updateSection(game, section.id, (value) => ({
                              ...value,
                              title: event.target.value,
                            })),
                          )
                        }
                        className="form-input"
                      />
                    </Field>
                    <DeleteButton
                      label={`Delete section ${section.title}`}
                      onClick={() => {
                        if (window.confirm('Delete this section and its steps from the draft?'))
                          changeGame((game) => ({
                            ...game,
                            walkthrough: game.walkthrough.filter((item) => item.id !== section.id),
                          }));
                      }}
                    />
                  </div>
                  {section.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="rounded-xl border border-tan-200 bg-white p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">Step {index + 1}</h4>
                        <DeleteButton
                          label={`Delete step ${index + 1}`}
                          onClick={() => {
                            if (window.confirm('Delete this step from the draft?'))
                              changeGame((game) =>
                                updateSection(game, section.id, (value) => ({
                                  ...value,
                                  steps: value.steps.filter((item) => item.id !== step.id),
                                })),
                              );
                          }}
                        />
                      </div>
                      <Field label={`Step ${index + 1} title`}>
                        <input
                          required
                          value={step.title}
                          maxLength={200}
                          onChange={(event) =>
                            changeStep(section.id, step.id, { title: event.target.value })
                          }
                          className="form-input"
                        />
                      </Field>
                      <Field label={`Step ${index + 1} instructions`}>
                        <textarea
                          required
                          value={step.description}
                          maxLength={10000}
                          onChange={(event) =>
                            changeStep(section.id, step.id, { description: event.target.value })
                          }
                          className="form-input min-h-24"
                        />
                      </Field>
                      <ImageInput
                        label={`Step ${index + 1} image`}
                        value={step.image}
                        onBusyChange={onUpload}
                        onChange={(image) => changeStep(section.id, step.id, { image })}
                      />
                      <Field label={`Step ${index + 1} image description`}>
                        <input
                          value={step.imageAlt}
                          maxLength={500}
                          onChange={(event) =>
                            changeStep(section.id, step.id, { imageAlt: event.target.value })
                          }
                          className="form-input"
                        />
                      </Field>
                      <label className="flex items-center gap-2 font-semibold">
                        <input
                          type="checkbox"
                          checked={step.hasSpoiler ?? false}
                          onChange={(event) =>
                            changeStep(section.id, step.id, { hasSpoiler: event.target.checked })
                          }
                        />
                        Contains a spoiler hint
                      </label>
                      {step.hasSpoiler && (
                        <Field label="Spoiler hint">
                          <textarea
                            value={step.spoilerText ?? ''}
                            maxLength={10000}
                            onChange={(event) =>
                              changeStep(section.id, step.id, { spoilerText: event.target.value })
                            }
                            className="form-input"
                          />
                        </Field>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      changeGame((game) =>
                        updateSection(game, section.id, (value) => ({
                          ...value,
                          steps: [...value.steps, createStep()],
                        })),
                      )
                    }
                    className="flex items-center gap-2 text-peach-600 font-bold"
                  >
                    <Plus size={16} />
                    Add Step
                  </button>
                </section>
              ))}
              <button
                type="button"
                onClick={() =>
                  changeGame((game) => ({
                    ...game,
                    walkthrough: [...game.walkthrough, createSection()],
                  }))
                }
                className="flex items-center gap-2 text-earth-600 font-bold"
              >
                <Plus size={20} />
                Add Walkthrough Section
              </button>
            </fieldset>
          </form>
        </>
      ) : (
        <>
          <div className="flex gap-6 mb-6 border-b-2 border-tan-200 pb-3">
            <button
              disabled={busy}
              onClick={() => setActiveTab('assets')}
              className={`font-bold ${activeTab === 'assets' ? 'text-peach-500' : 'text-tan-600'}`}
            >
              Site Assets
            </button>
            <button
              disabled={busy}
              onClick={() => setActiveTab('games')}
              className={`font-bold ${activeTab === 'games' ? 'text-peach-500' : 'text-tan-600'}`}
            >
              Manage Games
            </button>
          </div>
          {activeTab === 'assets' ? (
            <form onSubmit={saveSettings}>
              <fieldset
                disabled={busy}
                className="bg-white rounded-2xl p-5 sm:p-8 border-2 border-tan-200 space-y-6 disabled:opacity-70"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-xl font-display font-bold">Site settings</h2>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={resetSettings}
                      className="text-tan-600 font-semibold"
                    >
                      Discard / load latest
                    </button>
                    <SaveButton pending={pending} />
                  </div>
                </div>
                <ImageInput
                  label="Hero banner"
                  value={settings.heroImage}
                  onBusyChange={onUpload}
                  onChange={(heroImage) => setSettings((current) => ({ ...current, heroImage }))}
                />
                <ImageInput
                  label="Logo image"
                  value={settings.logoImage}
                  onBusyChange={onUpload}
                  onChange={(logoImage) => setSettings((current) => ({ ...current, logoImage }))}
                />
                <h3 className="text-xl font-display font-bold">Footer buttons & payment details</h3>
                <p className="text-sm text-tan-600">
                  Only verified payment details should be published. A payment popup is enabled only
                  when wallets are configured.
                </p>
                {settings.ctaLinks.map((link) => (
                  <div
                    key={link.id}
                    className="rounded-xl border-2 border-tan-200 bg-cream-50 p-4 space-y-4"
                  >
                    <div className="flex flex-wrap items-end gap-3">
                      <Field label="Button label">
                        <input
                          required
                          maxLength={100}
                          value={link.label}
                          onChange={(event) =>
                            changeLink(link.id, (value) => ({
                              ...value,
                              label: event.target.value,
                            }))
                          }
                          className="form-input"
                        />
                      </Field>
                      <Field label="Button URL">
                        <input
                          required
                          value={link.url}
                          onChange={(event) =>
                            changeLink(link.id, (value) => ({ ...value, url: event.target.value }))
                          }
                          className="form-input"
                        />
                      </Field>
                      <DeleteButton
                        label={`Delete button ${link.label}`}
                        onClick={() =>
                          setSettings((current) => ({
                            ...current,
                            ctaLinks: current.ctaLinks.filter((item) => item.id !== link.id),
                          }))
                        }
                      />
                    </div>
                    <label className="flex items-center gap-2 font-semibold">
                      <input
                        type="checkbox"
                        checked={Boolean(link.wallets)}
                        onChange={(event) =>
                          changeLink(link.id, (value) => ({
                            ...value,
                            wallets: event.target.checked
                              ? [{ name: 'GCash', accountName: '', accountNumber: '', qrCode: '' }]
                              : undefined,
                          }))
                        }
                      />
                      Open a payment popup
                    </label>
                    {link.wallets && (
                      <>
                        <Field label="Popup thank-you message">
                          <input
                            maxLength={1000}
                            value={link.customMessage ?? ''}
                            onChange={(event) =>
                              changeLink(link.id, (value) => ({
                                ...value,
                                customMessage: event.target.value,
                              }))
                            }
                            className="form-input"
                          />
                        </Field>
                        {link.wallets.map((wallet, index) => (
                          <div
                            key={index}
                            className="rounded-xl bg-white border border-tan-200 p-4 space-y-3"
                          >
                            <div className="grid sm:grid-cols-2 gap-3">
                              <Field label="Wallet name">
                                <input
                                  required
                                  maxLength={80}
                                  value={wallet.name}
                                  onChange={(event) =>
                                    changeWallet(link.id, index, { name: event.target.value })
                                  }
                                  className="form-input"
                                />
                              </Field>
                              <Field label="Account name">
                                <input
                                  required
                                  maxLength={200}
                                  value={wallet.accountName}
                                  onChange={(event) =>
                                    changeWallet(link.id, index, {
                                      accountName: event.target.value,
                                    })
                                  }
                                  className="form-input"
                                />
                              </Field>
                            </div>
                            <Field label="Account number or email">
                              <input
                                maxLength={200}
                                value={wallet.accountNumber}
                                onChange={(event) =>
                                  changeWallet(link.id, index, {
                                    accountNumber: event.target.value,
                                  })
                                }
                                className="form-input"
                              />
                            </Field>
                            <ImageInput
                              label="Wallet QR image"
                              value={wallet.qrCode ?? ''}
                              onBusyChange={onUpload}
                              onChange={(qrCode) => changeWallet(link.id, index, { qrCode })}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                changeLink(link.id, (value) => {
                                  const wallets = value.wallets?.filter(
                                    (_, walletIndex) => walletIndex !== index,
                                  );
                                  return {
                                    ...value,
                                    wallets: wallets?.length ? wallets : undefined,
                                  };
                                })
                              }
                              className="text-red-700 text-sm font-semibold"
                            >
                              Remove wallet
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          disabled={link.wallets.length >= 10}
                          onClick={() =>
                            changeLink(link.id, (value) => ({
                              ...value,
                              wallets: [
                                ...(value.wallets ?? []),
                                {
                                  name: 'New Wallet',
                                  accountName: '',
                                  accountNumber: '',
                                  qrCode: '',
                                },
                              ],
                            }))
                          }
                          className="text-peach-600 font-bold"
                        >
                          + Add Wallet
                        </button>
                      </>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  disabled={settings.ctaLinks.length >= 20}
                  onClick={() =>
                    setSettings((current) => ({
                      ...current,
                      ctaLinks: [
                        ...current.ctaLinks,
                        { id: `link-${crypto.randomUUID()}`, label: 'New Link', url: '#' },
                      ],
                    }))
                  }
                  className="flex items-center gap-2 text-peach-600 font-bold"
                >
                  <Plus size={16} />
                  Add Footer Button
                </button>
              </fieldset>
            </form>
          ) : (
            <div className="space-y-4">
              {site.games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-2xl p-5 border-2 border-tan-200 flex flex-wrap gap-4 justify-between items-center"
                >
                  <div>
                    <h2 className="font-bold text-xl">{game.title}</h2>
                    <p className="text-sm text-tan-600">
                      {game.walkthrough.length} walkthrough sections
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      disabled={busy}
                      onClick={() => beginEdit(game, site.gameRevisions[game.id])}
                      className="flex items-center gap-2 text-earth-600 font-bold"
                    >
                      <Edit2 size={18} />
                      Edit {game.title}
                    </button>
                    <DeleteButton
                      disabled={busy}
                      label={`Delete ${game.title}`}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Permanently delete “${game.title}” and all of its community notes?`,
                          )
                        )
                          void run(
                            () => site.removeGame(game.id, site.gameRevisions[game.id]),
                            'Game deleted.',
                          );
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                disabled={busy}
                onClick={() => beginEdit(createGame())}
                className="w-full border-2 border-dashed border-tan-300 rounded-2xl p-6 flex items-center justify-center gap-2 text-tan-600 font-bold"
              >
                <Plus size={24} />
                Add New Game
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block flex-1 min-w-0 font-semibold">
      <span className="block mb-1">{label}</span>
      {children}
    </label>
  );
}
function DeleteButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-xl p-2 text-red-600 hover:bg-red-50"
    >
      <Trash2 size={20} />
    </button>
  );
}
function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="flex items-center gap-2 rounded-xl bg-earth-500 px-4 py-2 text-white font-bold hover:bg-earth-600"
    >
      <Save size={18} />
      {pending ? 'Saving…' : 'Save Changes'}
    </button>
  );
}
