
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Link, 
  Unlink, 
  Image as ImageIcon,
  Upload,
  Trash,
  Wand2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  RemoveFormatting,
  Quote,
  ChevronDown
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (url: string) => void;
}

const RichTextEditor = ({ value, onChange, onImageUpload }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  
  const lastHtmlRef = useRef(value);
  const isInitialized = useRef(false);

  // Sincroniza o valor externo (Ex: quando a API carrega o post) sem sobrepor as edições do input
  React.useEffect(() => {
    if (editorRef.current) {
      if (!isInitialized.current) {
        editorRef.current.innerHTML = value || "";
        lastHtmlRef.current = value;
        isInitialized.current = true;
      } else if (value !== lastHtmlRef.current) {
        editorRef.current.innerHTML = value || "";
        lastHtmlRef.current = value;
      }
    }
  }, [value]);

  const formatDoc = (command: string, value?: string) => {
    if (command === 'formatBlock' && value) {
      document.execCommand(command, false, `<${value}>`);
    } else {
      document.execCommand(command, false, value);
    }
    updateEditorContent();
  };

  const updateEditorContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      if (html !== lastHtmlRef.current) {
        lastHtmlRef.current = html;
        onChange(html);
      }
    }
  };

  const handleAiAction = async (action: "grammar" | "seo" | "links" | "generate") => {
    if (!editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    
    if (!currentHtml || currentHtml.trim() === "" || currentHtml === "<br>") {
      toast({
        title: "Texto vazio",
        description: action === "generate" ? "Digite o tema ou palavra-chave na caixa primeiro (ex: Cuidadores SP) para a IA criar a matéria." : "Digite algum texto primeiro para o Assistente analisar.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAiLoading(true);
      const { data, error } = await supabase.functions.invoke("blog-ai-assistant", {
        body: { text: currentHtml, action },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.improvedText) {
        editorRef.current.innerHTML = data.improvedText.trim();
        updateEditorContent();
        toast({
          title: "Texto melhorado!",
          description: "O Assistente de IA acabou de aplicar as melhorias.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Erro no Assistente",
        description: err.message || "Verifique se a OPENAI_API_KEY está configurada no Supabase.",
        variant: "destructive",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploadingImage(true);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `content-images/${fileName}`;
      
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('public')
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get the public URL of the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
        
      if (publicUrlData && publicUrlData.publicUrl) {
        // Insert the image into the editor
        document.execCommand('insertImage', false, publicUrlData.publicUrl);
        updateEditorContent();
        
        // Also notify parent component if needed
        if (onImageUpload) {
          onImageUpload(publicUrlData.publicUrl);
        }
        
        toast({
          title: "Image uploaded",
          description: "The image has been uploaded and inserted.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred while uploading the image.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddLink = () => {
    if (showLinkInput) {
      if (linkUrl) {
        formatDoc('createLink', linkUrl);
      }
      setShowLinkInput(false);
      setLinkUrl("");
    } else {
      setShowLinkInput(true);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="p-2 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('bold')}
          title="Bold"
        >
          <Bold size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('italic')}
          title="Italic"
        >
          <Italic size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('underline')}
          title="Underline"
        >
          <Underline size={18} />
        </Button>
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        {/* Heading / Block Format Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 px-2 text-xs font-medium"
              title="Formato de Texto"
            >
              <Pilcrow size={16} />
              <span className="hidden sm:inline">Formato</span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuItem onClick={() => formatDoc('formatBlock', 'h1')} className="cursor-pointer">
              <Heading1 size={18} className="mr-2" />
              <span className="font-bold text-2xl leading-none">Título 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatDoc('formatBlock', 'h2')} className="cursor-pointer">
              <Heading2 size={18} className="mr-2" />
              <span className="font-bold text-xl leading-none">Título 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatDoc('formatBlock', 'h3')} className="cursor-pointer">
              <Heading3 size={18} className="mr-2" />
              <span className="font-semibold text-lg leading-none">Título 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatDoc('formatBlock', 'h4')} className="cursor-pointer">
              <Heading4 size={18} className="mr-2" />
              <span className="font-semibold text-base leading-none">Título 4</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatDoc('formatBlock', 'p')} className="cursor-pointer">
              <Pilcrow size={18} className="mr-2" />
              <span className="text-base">Parágrafo</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatDoc('formatBlock', 'blockquote')} className="cursor-pointer">
              <Quote size={18} className="mr-2" />
              <span className="text-base italic">Citação</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatDoc('removeFormat')} className="cursor-pointer text-red-600">
              <RemoveFormatting size={18} className="mr-2" />
              <span className="text-base">Remover Formatação</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('justifyRight')}
          title="Align Right"
        >
          <AlignRight size={18} />
        </Button>
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('insertUnorderedList')}
          title="Bullet List"
        >
          <List size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </Button>
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleAddLink}
          title="Insert Link"
        >
          <Link size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatDoc('unlink')}
          title="Remove Link"
        >
          <Unlink size={18} />
        </Button>
        <div className="h-6 w-px bg-gray-300 mx-1"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleUploadClick}
          disabled={isUploadingImage}
          title="Upload Image"
        >
          {isUploadingImage ? (
            <div className="h-4 w-4 border-2 border-t-transparent border-careconnect-blue rounded-full animate-spin"></div>
          ) : (
            <Upload size={18} />
          )}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelected}
          accept="image/*"
          className="hidden"
        />
        
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 font-medium"
                disabled={isAiLoading}
              >
                {isAiLoading ? (
                  <div className="h-4 w-4 mr-2 border-2 border-t-transparent border-violet-700 rounded-full animate-spin"></div>
                ) : (
                  <Wand2 size={16} className="mr-2" />
                )}
                {isAiLoading ? "Pensando..." : "Assistente Especial"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleAiAction("generate")} className="cursor-pointer font-bold text-careconnect-green">
                🪄 Escrever Matéria do Zero
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAiAction("grammar")} className="cursor-pointer">
                ✨ Corrigir Ortografia/Gramática
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAiAction("seo")} className="cursor-pointer">
                🚀 Otimizar para Resultados (SEO)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAiAction("links")} className="cursor-pointer">
                🔗 Sugerir Links de Venda
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {showLinkInput && (
        <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <Input
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAddLink} size="sm">
            Insert
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowLinkInput(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .rich-editor-area h1 { font-size: 2em; font-weight: 700; margin: 0.67em 0; color: #222; }
        .rich-editor-area h2 { font-size: 1.5em; font-weight: 700; margin: 0.6em 0; color: #222; }
        .rich-editor-area h3 { font-size: 1.25em; font-weight: 600; margin: 0.5em 0; color: #333; }
        .rich-editor-area h4 { font-size: 1.1em; font-weight: 600; margin: 0.4em 0; color: #333; }
        .rich-editor-area blockquote { border-left: 4px solid #3b82f6; padding-left: 16px; margin: 16px 0; color: #555; font-style: italic; background: #f8fafc; padding: 12px 16px; border-radius: 0 4px 4px 0; }
        .rich-editor-area p { margin-bottom: 0.8em; }
        .rich-editor-area img { max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0; }
      `}} />
      
      <div
        ref={editorRef}
        contentEditable
        className="rich-editor-area p-4 min-h-[200px] focus:outline-none"
        onInput={updateEditorContent}
        onBlur={updateEditorContent}
      />
    </div>
  );
};

export default RichTextEditor;
