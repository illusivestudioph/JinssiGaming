import { useState } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { Game, WalkthroughSection } from '@/data/games';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus, Image as ImageIcon, Edit2, ChevronLeft, Save, Upload } from 'lucide-react';

export function AdminDashboard() {
  const { games, heroImage, logoImage, ctaLinks, setHeroImage, setLogoImage, setCtaLinks, addGame, updateGame, removeGame } = useSiteContent();
  const [activeTab, setActiveTab] = useState<'assets' | 'games'>('assets');
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filePath = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    const { error } = await supabase.storage.from('site-images').upload(filePath, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      alert(`Image upload failed: ${error.message}`);
      return;
    }

    const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
    onComplete(data.publicUrl);
  };

  const handleAddGame = () => {
    const newGame: Game = {
      id: `game-${Date.now()}`,
      title: 'New Game',
      developer: 'Your Studio',
      category: 'Cozy Games',
      description: 'Add a description for this game.',
      editorNote: '',
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      coverAlt: 'Placeholder cover',
      accentColor: '#E2A88D',
      walkthrough: []
    };
    addGame(newGame);
    setEditingGame(newGame);
  };

  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      updateGame(editingGame);
      setEditingGame(null);
    }
  };

  // --- Walkthrough Editor Helpers ---
  const addWalkthroughSection = () => {
    if (!editingGame) return;
    const newSection: WalkthroughSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      steps: []
    };
    setEditingGame({ ...editingGame, walkthrough: [...editingGame.walkthrough, newSection] });
  };

  const updateSectionTitle = (sectionIndex: number, newTitle: string) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex] = { ...newWalkthrough[sectionIndex], title: newTitle };
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const removeSection = (sectionIndex: number) => {
    if (!editingGame) return;
    const newWalkthrough = editingGame.walkthrough.filter((_, idx) => idx !== sectionIndex);
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const addStep = (sectionIndex: number) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex].steps.push({
      id: `step-${Date.now()}`,
      title: 'New step',
      description: 'New step instruction',
      image: '',
      imageAlt: 'Step illustration',
    });
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const updateStep = (sectionIndex: number, stepIndex: number, field: 'title' | 'description' | 'image', value: string) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex].steps[stepIndex] = { 
      ...newWalkthrough[sectionIndex].steps[stepIndex], 
      [field]: value 
    };
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const removeStep = (sectionIndex: number, stepIndex: number) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex].steps = newWalkthrough[sectionIndex].steps.filter((_, idx) => idx !== stepIndex);
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  // --- GAME EDITOR VIEW ---
  if (editingGame) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
        <button 
          onClick={() => setEditingGame(null)} 
          className="flex items-center gap-2 text-tan-500 hover:text-ink-900 font-bold mb-6 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Dashboard
        </button>

        <form onSubmit={handleSaveGame} className="notepad-card p-8">
          <div className="flex justify-between items-center border-b-2 border-tan-100 pb-4 mb-6">
            <h2 className="text-3xl font-display font-bold text-ink-900">Edit Game</h2>
            <button type="submit" className="site-button bg-earth-500 text-white hover:bg-earth-600">
              <Save size={18} /> Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block font-bold text-ink-900 mb-2">Game Title</label>
              <input 
                value={editingGame.title}
                onChange={(e) => setEditingGame({...editingGame, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-ink-900 mb-2">Game Description</label>
              <textarea
                value={editingGame.description}
                onChange={(e) => setEditingGame({...editingGame, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 min-h-[100px]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-ink-900 mb-2">Editor&apos;s Note / Review</label>
              <textarea
                value={editingGame.editorNote || ''}
                onChange={(e) => setEditingGame({...editingGame, editorNote: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 min-h-[120px]"
                placeholder="Share a personal take, praise, warning, or bit of playful ranting about this game..."
              />
              <p className="mt-2 text-sm font-semibold text-tan-500">
                This appears on the walkthrough page as your personal note about the game.
              </p>
            </div>
            <div>
              <label className="block font-bold text-ink-900 mb-2">Accent Color (Hex)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={editingGame.accentColor}
                  onChange={(e) => setEditingGame({...editingGame, accentColor: e.target.value})}
                  className="h-12 w-12 rounded-lg cursor-pointer"
                />
                <input 
                  value={editingGame.accentColor}
                  onChange={(e) => setEditingGame({...editingGame, accentColor: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 uppercase font-mono"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-ink-900 mb-2">Cover Image URL</label>
              <div className="flex gap-2">
                <input 
                  value={editingGame.coverImage}
                  onChange={(e) => setEditingGame({...editingGame, coverImage: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50"
                />
                <label className="flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap">
                  <Upload size={18} className="mr-2" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setEditingGame({...editingGame, coverImage: base64}))} />
                </label>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-ink-900 mb-4">Walkthrough Guides</h3>
          
          <div className="flex flex-col gap-8">
            {editingGame.walkthrough.map((section, sIndex) => (
              <div key={sIndex} className="notepad-card p-6 relative">
                <button 
                  type="button" 
                  onClick={() => removeSection(sIndex)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-white p-2 rounded-lg shadow-sm border border-tan-200"
                  title="Delete Section"
                >
                  <Trash2 size={18} />
                </button>

                <div className="mb-6 mr-12">
                  <label className="block font-bold text-tan-600 mb-2 text-sm uppercase tracking-wider">Section {sIndex + 1} Title</label>
                  <input 
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-tan-200 focus:border-peach-400 focus:outline-none font-bold text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 pl-4 border-l-4 border-tan-200">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="notepad-step p-4 flex flex-col gap-3 relative group">
                      <button 
                        type="button"
                        onClick={() => removeStep(sIndex, stepIndex)}
                        className="absolute -right-3 -top-3 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                      
                      <div>
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Step {stepIndex + 1} Title</label>
                        <input
                          value={step.title}
                          onChange={(e) => updateStep(sIndex, stepIndex, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none mb-3"
                          placeholder="Step title"
                          required
                        />
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Instructions / Description</label>
                        <textarea 
                          value={step.description}
                          onChange={(e) => updateStep(sIndex, stepIndex, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none min-h-[80px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Step Image (URL or Upload)</label>
                        <div className="flex gap-2">
                          <input 
                            value={step.image || ''}
                            onChange={(e) => updateStep(sIndex, stepIndex, 'image', e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none text-sm"
                            placeholder="https:// or upload..."
                          />
                          <label className="px-3 py-2 bg-earth-100 text-earth-700 font-bold rounded-lg cursor-pointer hover:bg-earth-200 transition-colors text-xs flex items-center gap-1 whitespace-nowrap">
                            <Upload size={14} /> Upload
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, (base64) => updateStep(sIndex, stepIndex, 'image', base64))} 
                            />
                          </label>
                        </div>
                        {step.image && (
                          <img src={step.image} alt="Step preview" className="mt-2 h-20 w-full object-cover rounded-lg border border-tan-200" />
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={() => addStep(sIndex)}
                    className="self-start text-sm font-bold text-peach-500 hover:text-peach-600 bg-peach-50 px-4 py-2 rounded-lg flex items-center gap-2 mt-2"
                  >
                    <Plus size={16} /> Add Step
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button"
            onClick={addWalkthroughSection}
            className="w-full mt-8 border-2 border-dashed border-tan-300 rounded-xl p-4 text-tan-600 font-bold hover:border-earth-400 hover:bg-earth-50 hover:text-earth-600 transition-colors flex justify-center items-center gap-2"
          >
            <Plus size={20} /> Add New Walkthrough Section
          </button>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-4xl font-display font-bold text-ink-900 mb-2">Admin Dashboard</h2>
        <p className="text-tan-600 font-semibold">Manage your site's content. Changes auto-save to your local storage.</p>
      </div>

      <div className="flex gap-4 mb-6 border-b-2 border-tan-200 pb-2">
        <button onClick={() => setActiveTab('assets')} className={`font-bold pb-2 ${activeTab === 'assets' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Site Assets</button>
        <button onClick={() => setActiveTab('games')} className={`font-bold pb-2 ${activeTab === 'games' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Manage Games</button>
      </div>

      {activeTab === 'assets' && (
        <div className="notepad-card p-6 flex flex-col gap-6">
          <div>
            <label className="block font-bold text-ink-900 mb-2 flex items-center gap-2"><ImageIcon size={18}/> Hero Banner</label>
            <div className="flex gap-2">
              <input 
                value={heroImage} 
                onChange={(e) => setHeroImage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-cream-50 focus:outline-none"
              />
              <label className="flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap">
                <Upload size={18} className="mr-2" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setHeroImage)} />
              </label>
            </div>
            {heroImage && <img src={heroImage} className="mt-3 h-32 w-full max-w-xl object-cover rounded-lg border border-tan-200" alt="Hero preview" />}
          </div>
          
          <div className="pb-6 border-b-2 border-tan-100">
            <label className="block font-bold text-ink-900 mb-2 flex items-center gap-2"><ImageIcon size={18}/> Logo Image</label>
            <div className="flex gap-2">
              <input 
                value={logoImage} 
                onChange={(e) => setLogoImage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-cream-50 focus:outline-none"
              />
              <label className="flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap">
                <Upload size={18} className="mr-2" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, setLogoImage)} />
              </label>
            </div>
            {logoImage && <img src={logoImage} className="mt-3 h-16 w-16 object-cover rounded-full border border-tan-200" alt="Logo preview" />}
          </div>

          {/* CTA LINKS & PERMANENT MULTI-WALLET CONFIGURATOR */}
          <div>
            <label className="block font-bold text-ink-900 mb-4 text-xl">Footer Call-to-Action Buttons & Payment Modals</label>
            <div className="flex flex-col gap-6">
              {ctaLinks?.map((link, index) => (
                <div key={link.id} className="notepad-card p-5 flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <input 
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...ctaLinks];
                        newLinks[index].label = e.target.value;
                        setCtaLinks(newLinks);
                      }}
                      placeholder="Button Label (e.g. Buy me coffee ($5))"
                      className="w-1/3 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none font-bold"
                    />
                    <input 
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...ctaLinks];
                        newLinks[index].url = e.target.value;
                        setCtaLinks(newLinks);
                      }}
                      placeholder="Fallback URL..."
                      className="flex-1 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none"
                    />
                    <button 
                      onClick={() => setCtaLinks(ctaLinks.filter((_, i) => i !== index))}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Toggle Button to Turn ANY Button into a Payment Popup */}
                  <div className="notepad-step flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id={`enable-payment-${link.id}`}
                        checked={!!(link.wallets && link.wallets.length > 0)}
                        onChange={(e) => {
                          const newLinks = [...ctaLinks];
                          if (e.target.checked) {
                            newLinks[index].wallets = [
                              { name: 'GCash', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789', qrCode: '' },
                              { name: 'Maya', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789', qrCode: '' },
                              { name: 'PayPal', accountName: 'mjhanesultancruz1514@gmail.com', accountNumber: 'mjhanesultancruz1514@gmail.com', qrCode: '' },
                              { name: 'Wise', accountName: 'Mary Jane C.', accountNumber: 'mjhanesultancruz1514@gmail.com', qrCode: '' }
                            ];
                            newLinks[index].customMessage = 'Thank you so much for supporting the site and fueling late-night gaming sessions! ☕✨';
                          } else {
                            delete newLinks[index].wallets;
                            delete newLinks[index].customMessage;
                          }
                          setCtaLinks(newLinks);
                        }}
                        className="w-4 h-4 accent-peach-500 cursor-pointer"
                      />
                      <label htmlFor={`enable-payment-${link.id}`} className="text-sm font-bold text-ink-900 cursor-pointer">
                        Open Multi-Wallet Payment Popup (GCash, Maya, PayPal, Wise) when clicked
                      </label>
                    </div>
                  </div>

                  {/* Wallet Config Sub-Editor (Shown when checkbox is ticked) */}
                  {link.wallets && link.wallets.length > 0 && (
                    <div className="flex flex-col gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-tan-500 uppercase tracking-wider block mb-1">Custom Popup Thank-You Message:</label>
                        <input 
                          value={link.customMessage || ''}
                          onChange={(e) => {
                            const newLinks = [...ctaLinks];
                            newLinks[index].customMessage = e.target.value;
                            setCtaLinks(newLinks);
                          }}
                          placeholder="Message shown inside the popup card..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-tan-200 bg-white focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-tan-500 uppercase tracking-wider">Configure Wallets & QR Codes:</span>
                        <button 
                          type="button"
                          onClick={() => {
                            const newLinks = [...ctaLinks];
                            if (!newLinks[index].wallets) newLinks[index].wallets = [];
                            newLinks[index].wallets!.push({ name: 'New Wallet', accountName: '', accountNumber: '', qrCode: '' });
                            setCtaLinks(newLinks);
                          }}
                          className="text-xs font-bold text-peach-600 bg-peach-50 px-3 py-1.5 rounded-lg hover:bg-peach-100"
                        >
                          + Add Wallet
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {link.wallets.map((wallet, wIndex) => (
                            <div key={wIndex} className="notepad-step p-4 flex flex-col gap-3">
                            <div className="flex gap-2 items-center">
                              <input 
                                value={wallet.name}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].name = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Wallet Name"
                                className="w-1/4 px-2 py-1.5 text-sm rounded border border-tan-200 font-bold"
                              />
                              <input 
                                value={wallet.accountName}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].accountName = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Account Name"
                                className="w-1/4 px-2 py-1.5 text-sm rounded border border-tan-200"
                              />
                              <input 
                                value={wallet.accountNumber}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].accountNumber = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Number / Email ID"
                                className="flex-1 px-2 py-1.5 text-sm rounded border border-tan-200 font-mono"
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets = newLinks[index].wallets!.filter((_, i) => i !== wIndex);
                                  setCtaLinks(newLinks);
                                }}
                                className="text-red-400 hover:text-red-600 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            {/* QR Code Upload per Wallet */}
                            <div className="flex items-center gap-2 pt-2 border-t border-tan-100 text-xs">
                              <span className="text-tan-500 font-bold">QR Image:</span>
                              <input 
                                value={wallet.qrCode || ''}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].qrCode = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Paste QR image URL or upload..."
                                className="flex-1 px-2 py-1 rounded border border-tan-200 bg-cream-50"
                              />
                              <label className="px-2 py-1 bg-earth-100 text-earth-700 font-bold rounded cursor-pointer hover:bg-earth-200 whitespace-nowrap">
                                Upload QR
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => handleImageUpload(e, (base64) => {
                                    const newLinks = [...ctaLinks];
                                    newLinks[index].wallets![wIndex].qrCode = base64;
                                    setCtaLinks(newLinks);
                                  })} 
                                />
                              </label>
                              {wallet.qrCode && (
                                <img src={wallet.qrCode} alt="QR Preview" className="w-8 h-8 object-cover rounded border border-tan-300" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => setCtaLinks([...(ctaLinks || []), { id: `link-${Date.now()}`, label: 'New Link', url: '' }])}
                className="self-start mt-2 px-4 py-2 bg-peach-50 text-peach-600 font-bold rounded-lg flex items-center gap-2 hover:bg-peach-100 transition-colors"
              >
                <Plus size={16} /> Add Footer Button
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'games' && (
        <div className="flex flex-col gap-4">
          {games.map(game => (
            <div key={game.id} className="notepad-card p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-xl object-cover shadow-sm bg-cover bg-center border border-tan-200"
                  style={{ backgroundImage: `url(${game.coverImage})`}} 
                />
                <div>
                  <h3 className="font-bold text-xl text-ink-900">{game.title}</h3>
                  <span className="text-sm font-semibold text-tan-500 bg-tan-100 px-2 py-1 rounded-md">{game.walkthrough.length} Walkthrough Sections</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingGame(game)} 
                  className="p-3 text-earth-600 bg-earth-50 hover:bg-earth-100 font-bold rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button 
                  onClick={() => removeGame(game.id)} 
                  className="p-3 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors"
                  title="Delete Game"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleAddGame} 
            className="border-2 border-dashed border-tan-300 rounded-2xl p-6 flex flex-col items-center justify-center text-tan-500 hover:text-peach-500 hover:border-peach-300 hover:bg-peach-50 transition-all font-bold gap-2 mt-4"
          >
            <Plus size={24} /> Add New Game
          </button>
        </div>
      )}
    </div>
  );
}