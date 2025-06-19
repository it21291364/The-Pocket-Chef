
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast"
import { DarkModeToggle } from '@/components/DarkModeToggle';

// Kawaii Components
import ChefHatIcon from '@/components/icons/ChefHatIcon';
import BroccoliIcon from '@/components/icons/BroccoliIcon';
import RamenLoaderIcon from '@/components/icons/RamenLoaderIcon';
import LightbulbIcon from '@/components/icons/LightbulbIcon';
import JuiceBoxIcon from '@/components/icons/JuiceBoxIcon';
import HappyHeartIcon from '@/components/icons/HappyHeartIcon';
import TagInput from '@/components/kawaii/TagInput';
import ErrorDisplay from '@/components/kawaii/ErrorDisplay';
import KawaiiModal from '@/components/kawaii/KawaiiModal';

// Lucide Icons
import { Sparkles, CheckCircle2, Info, Utensils, GlassWater, Target, Heart } from 'lucide-react';

// Actions & Types
import { generateRecipeAction, suggestDrinkPairingsAction, getNutritionInfoAction } from './actions';
import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import type { SuggestDrinkPairingsOutput } from '@/ai/flows/suggest-drink-pairings';
import type { GetNutritionInfoOutput } from '@/ai/flows/get-nutrition-information';

type ModalType = 'drinks' | 'nutrition';

export default function KawaiiChefPage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  const [recipeData, setRecipeData] = useState<GenerateRecipeOutput | null>(null);
  const [drinkPairings, setDrinkPairings] = useState<SuggestDrinkPairingsOutput | null>(null);
  const [nutritionInfo, setNutritionInfo] = useState<GetNutritionInfoOutput | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (ingredients.length > 0) { 
      setError(null);
    }
  }, [ingredients]);

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      setError("Oopsie! Please add some ingredients so I can cook something up!");
      return;
    }
    setError(null);
    setIsLoading(true);
    setRecipeData(null);

    const result = await generateRecipeAction({ ingredients }); 
    setIsLoading(false);

    if ('error' in result) {
      toast({ title: "Recipe Error", description: result.error, variant: "destructive" });
      setError(result.error);
    } else {
      setRecipeData(result);
    }
  };

  const openModal = async (type: ModalType) => {
    if (!recipeData) return;

    setModalType(type);
    setIsModalOpen(true);
    setIsModalLoading(true);
    setError(null); 

    if (type === 'drinks') {
      setDrinkPairings(null);
      const result = await suggestDrinkPairingsAction({ recipeName: recipeData.recipeName, ingredients: recipeData.ingredients });
      if ('error' in result) {
        toast({ title: "Drinks Error", description: result.error, variant: "destructive" });
      } else {
        setDrinkPairings(result);
      }
    } else if (type === 'nutrition') {
      setNutritionInfo(null);
      const result = await getNutritionInfoAction({ ingredients: recipeData.ingredients });
       if ('error' in result) {
        toast({ title: "Nutrition Error", description: result.error, variant: "destructive" });
      } else {
        setNutritionInfo(result);
      }
    }
    setIsModalLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setDrinkPairings(null);
    setNutritionInfo(null);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8 bg-background selection:bg-primary/30 selection:text-primary-foreground relative"
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <DarkModeToggle />
      </div>
      <header className="text-center mb-8 mt-4 sm:mt-8">
        <div className="p-6 rounded-2xl inline-block">
          <div className="flex items-center justify-center gap-3">
            <ChefHatIcon className="h-14 w-14 sm:h-16 sm:w-16" />
            <h1 className="text-4xl sm:text-5xl font-extrabold font-headline text-primary tracking-tight">
              The Pocket Chef
            </h1>
          </div>
          <p className="text-lg text-foreground/80 mt-2 font-body">
            Your adorable kitchen helper for yummy ideas!
          </p>
        </div>
      </header>

      <main className="w-full max-w-3xl bg-card p-6 sm:p-8 rounded-2xl shadow-kawaii-lg">
        <section className="input-section">
          <TagInput
            id="ingredients-input"
            tags={ingredients}
            setTags={setIngredients}
            placeholder="e.g., eggs, cheese, love..."
            label="What yummy ingredients do you have?"
            icon={<BroccoliIcon />}
          />
          <Button
            onClick={handleGenerateRecipe}
            disabled={isLoading}
            className="w-full text-lg py-6 rounded-xl jiggle-button bg-primary hover:bg-primary/90 text-primary-foreground shadow-kawaii font-headline"
            aria-label="Create a Recipe"
            suppressHydrationWarning={true}
          >
            <Sparkles className="mr-2 h-6 w-6" />
            Create a Recipe!
          </Button>
        </section>
        
        {error && !isLoading && <ErrorDisplay message={error} />}

        {isLoading && (
          <div className="flex justify-center items-center my-10">
            <RamenLoaderIcon />
          </div>
        )}

        {recipeData && !isLoading && (
          <Card className="mt-8 rounded-2xl shadow-kawaii bg-background/50 border-primary/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline text-primary">{recipeData.recipeName}</CardTitle>
              <CardDescription className="text-md italic text-foreground/70 font-body pt-1">{recipeData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-headline text-accent-foreground mb-3 flex items-center"><Utensils className="mr-2 h-5 w-5 text-accent"/>Ingredients</h3>
                  <ul className="space-y-1.5 list-inside font-body">
                    {recipeData.ingredients.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-headline text-accent-foreground mb-3 flex items-center"><Target className="mr-2 h-5 w-5 text-accent"/>Instructions</h3>
                  <ol className="space-y-2.5 list-inside font-body">
                    {recipeData.instructions.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="flex items-center justify-center h-6 w-6 bg-primary text-primary-foreground rounded-full text-xs font-bold mr-2.5 shrink-0">{index + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {recipeData.alternativeMethod && recipeData.alternativeMethod.description && (
                <div className="mt-6 p-4 bg-accent/30 border border-accent rounded-xl shadow-sm">
                  <h4 className="text-lg font-headline text-accent-foreground mb-2 flex items-center">
                    <LightbulbIcon className="mr-2" />
                    Alternative Method
                  </h4>
                  <p className="text-sm text-foreground/80 font-body">{recipeData.alternativeMethod.description}</p>
                </div>
              )}

              <Separator className="my-6 bg-primary/20" />

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => openModal('drinks')}
                  className="flex-1 py-5 rounded-xl jiggle-button bg-accent hover:bg-accent/90 text-accent-foreground shadow-kawaii font-headline"
                  aria-label="Suggest Drinks"
                  suppressHydrationWarning={true}
                >
                  <JuiceBoxIcon className="mr-2" />
                  Suggest Drinks!
                </Button>
                <Button
                  onClick={() => openModal('nutrition')}
                  className="flex-1 py-5 rounded-xl jiggle-button bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-kawaii font-headline"
                  aria-label="Get Nutrition Info"
                  suppressHydrationWarning={true}
                >
                  <HappyHeartIcon className="mr-2" />
                  Nutrition Info!
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <KawaiiModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalType === 'drinks' ? 'Cute Drink Pairings!' : 'Yummy Nutrition Facts!'}
      >
        {isModalLoading && <div className="flex justify-center items-center p-8"><RamenLoaderIcon /></div>}
        
        {modalType === 'drinks' && drinkPairings && !isModalLoading && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-headline text-destructive">🍷 Wine Pairing</h4>
              <p className="font-semibold">{drinkPairings.wine.pairing}</p>
              <p className="text-sm text-foreground/80">{drinkPairings.wine.reason}</p>
            </div>
            <div>
              <h4 className="text-lg font-headline text-accent">🍺 Beer Pairing</h4>
              <p className="font-semibold">{drinkPairings.beer.pairing}</p>
              <p className="text-sm text-foreground/80">{drinkPairings.beer.reason}</p>
            </div>
            <div>
              <h4 className="text-lg font-headline text-primary">🍹 Non-Alcoholic</h4>
              <p className="font-semibold">{drinkPairings.non_alcoholic.pairing}</p>
              <p className="text-sm text-foreground/80">{drinkPairings.non_alcoholic.reason}</p>
            </div>
          </div>
        )}

        {modalType === 'nutrition' && nutritionInfo && !isModalLoading && (
          <div className="space-y-3">
            <p><strong>Calories:</strong> {nutritionInfo.calories}</p>
            <p><strong>Protein:</strong> {nutritionInfo.protein}</p>
            <p><strong>Carbs:</strong> {nutritionInfo.carbs}</p>
            <p><strong>Fat:</strong> {nutritionInfo.fat}</p>
            <Separator className="my-3 bg-primary/20" />
            <p className="text-xs italic text-foreground/60">{nutritionInfo.disclaimer}</p>
          </div>
        )}
        {!isModalLoading && ((modalType === 'drinks' && !drinkPairings) || (modalType === 'nutrition' && !nutritionInfo)) && (
          <ErrorDisplay message="Aww, couldn't fetch the details this time. Maybe try again?"/>
        )}
      </KawaiiModal>
      
      <footer className="text-center mt-12 mb-6 text-sm text-foreground/60 font-body">
        <div className="p-4 rounded-2xl inline-block">
          <p>&copy; {new Date().getFullYear()} The Pocket Chef. Made with lots of <Heart className="inline h-4 w-4 text-accent fill-accent" /> and a sprinkle of AI magic!</p>
        </div>
      </footer>
    </div>
  );
}
